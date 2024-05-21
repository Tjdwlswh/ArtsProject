import { chatLogic } from './chatLogic.js';
import { chatQuery } from './chatQuery.js';
import { db } from '../../models/index.js';

const chatController = {
  createRooms: async (req, res, next) => {
    try {
      const UserId = req.user.id;
      console.log('rooms', UserId);
      console.log('roomsBody', req.body);
      const { title, max, password } = req.body;
      const newRooms = await chatLogic.createRooms({
        title,
        max,
        password,
        UserId,
      });

      const io = req.app.get('io');
      io.of('/rooms').emit('newRooms', newRooms);

      if (newRooms.errMessage) {
        throw new Error(newRooms.errMessage);
      }
      return res.status(201).json(newRooms);
    } catch (err) {
      next(err);
    }
  },
  getRooms: async (req, res, next) => {
    try {
      const FindAllRooms = await chatLogic.getFindRooms({});
      console.log(FindAllRooms);
      return res.status(201).json(FindAllRooms);
    } catch (err) {
      next(err);
    }
  },

  enterRoom: async (req, res, next) => {
    try {
      const id = req.params.id;
      const password = req.query.password;

      const room = await chatLogic.getFindRoom({ id, password });

      const io = req.app.get('io');
      const { rooms } = io.of('/chat').adapter;
      console.log('rooms가뭐지', rooms);
      // if(room.max <= rooms.get(id)?.size){
      // const errorMessage = "허용 인원을 초과했습니다."
      // throw new ConflictException(errorMessage)
      // }

      const chats = await db.AllChat.findAll({
        where: {
          RoomsId: room.id,
        },
        include: [{ model: db.User, attributes: ['nickname', 'id', 'snsId'] }],
        order: [['create_at', 'ASC']],
      });
      // req.app.get('io').of('/chat').to(room.id).emit('join',{
      //     User:"system",
      //     chat:`${chats.User.nickname}님이 입장하셨습니다.`
      // })
      return res.status(201).json({ room, chats });
    } catch (err) {
      next(err);
    }
  },

  removeRoom: async (req, res, next) => {
    try {
      const id = req.params.id;
      await chatQuery.deleteRoom({ id });
      await chatQuery.deleteChat({ id });
      return res.status(200).json({ message: '삭제완료' });
    } catch (err) {
      next(err);
    }
  },

  sendChat: async (req, res, next) => {
    try {
      const { chat } = req.body;

      const RoomsId = req.params.id;
      const PostChatID = req.user.id;

      const createChat = await chatLogic.chatCreate({ chat, RoomsId, PostChatID });

      //chat id 로 보낸 채팅을 찾아서 거기서 findOne으로 User에 넣어서 보내야함
      req.app.get('io').of('/chat').to(RoomsId).emit('chat', createChat);
      //join 연결후에 이거 적용시키면 될듯?
      return res.status(200).json({ message: '저장완료' });
    } catch (err) {
      next(err);
    }
  },
};

export { chatController };
