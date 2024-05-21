// import { WebSocketServer } from "ws";
import { Server } from 'socket.io';

const Socket = (server, app) => {
  const io = new Server(
    server,
    {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    },
    { path: '/socket.io' },
  );

  app.set('io', io);
  const rooms = io.of('/rooms');
  const chat = io.of('/chat');

  rooms.on('connection', socket => {
    console.log('rooms 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('rooms 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', socket => {
    console.log('chat 네임스페이스에 접속');
    socket.on('join', data => {
      const { ParamsId, users } = data;
      socket.join(ParamsId);

      if (users) {
        socket.to(ParamsId).emit('join', {
          users,
          User: 'system',
          chat: `${users.nickname}님이 입장하셨습니다.` || 'null',
        });
      } else {
        users === 'null';
        socket.to(ParamsId).emit('join', {
          users,
          User: 'system',
          chat: `${users.nickname}님이 입장하셨습니다.` || 'null',
        });
      }
    });
    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      const { referer } = socket.request.headers;
      console.log('레퍼럴', referer);
      const roomId = new URL(referer).pathname.split('/').at(-1);
      console.log(roomId);
      const currentRoom = chat.adapter.rooms.get(roomId);
      console.log('이게뭐지', currentRoom);
      const userCount = currentRoom?.SIZE || 0;

      if (userCount === 0) {
        rooms.emit('removeRooms', roomId);
        console.log('방 제거 요청 성공');
      } else {
        socket.to(roomId).emit('exit', {
          User: 'system',
          chat: `퇴장하셨습니다.`,
        });
      }
    });
  });

  io.on('connection', socket => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', error => {
      console.error(error);
    });
    socket.on('reply', data => {
      console.log(data);
    });
    socket.interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.IO');
    }, 500000);
  });
};

export { Socket };
