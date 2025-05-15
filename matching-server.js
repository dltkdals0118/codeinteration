const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const helmet = require('helmet');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// helmet 기본 사용 (CSP 완화) - static 서빙보다 먼저 적용
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
        styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.socket.io"],
        connectSrc: ["'self'", "ws:", "wss:"],
      },
    },
  })
);

const waitingUsers = new Map();

io.on('connection', (socket) => {
  socket.on('join-matching', (user) => {
    waitingUsers.set(socket.id, { user, joinedAt: Date.now(), socketId: socket.id });
    tryMatch(socket.id);
  });

  socket.on('disconnect', () => {
    waitingUsers.delete(socket.id);
  });
});

function tryMatch(socketId) {
  const current = waitingUsers.get(socketId);
  if (!current) return;

  const candidates = [...waitingUsers.values()]
    .filter(u => u.socketId !== socketId);

  if (candidates.length > 0) {
    const partner = candidates[0];
    const sessionId = uuidv4();
    io.to(socketId).emit('match-found', { sessionId, partner: partner.user });
    io.to(partner.socketId).emit('match-found', { sessionId, partner: current.user });
    waitingUsers.delete(socketId);
    waitingUsers.delete(partner.socketId);
  }
}

app.get('/', (req, res) => {
  res.send('OneMinute 실시간 매칭 서버가 정상 동작 중입니다!');
});

app.use('/web', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Matching server running on port ${PORT}`);
}); 