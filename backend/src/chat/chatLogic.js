import { chatQuery } from './chatQuery.js';
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '../libs/httpException.js';
import { db } from '../../models/index.js';

const chatLogic = {
  createRooms: async ({ title, max, password, UserId }) => {
    const newRooms = { title, max, password };
    console.log('newRooms', newRooms);
    const users = await chatQuery.findId({ UserId });
    console.log('rooms', users);
    const { nickname } = users;

    const IsRooms = await chatQuery.findRooms({ nickname });
    console.log(IsRooms);
    if (IsRooms.length >= 1) {
      const errorMessage = `이미 채팅방을 만드셨습니다.`;

      throw new ConflictException(errorMessage);
    }

    const createChat = await chatQuery.create({ title, max, password, owner: nickname });
    return createChat;
  },

  getFindRooms: async () => {
    return await chatQuery.findAll({});
  },

  getFindRoom: async ({ id, password }) => {
    const room = await chatQuery.findRoom({ id });

    if (!room) {
      const errorMessage = '존재하지 않는 방입니다.';

      throw new NotFoundException(errorMessage);
    }

    if (room.password && room.password !== password) {
      const errorMessage = '비밀번호가 틀렸습니다.';
      throw new BadRequestException(errorMessage);
    }
    return room;
  },

  chatCreate: async ({ chat, RoomsId, PostChatID }) => {
    const user = await db.User.findOne({
      where: {
        id: PostChatID,
      },
    });
    console.log(user);
    const { nickname, snsId } = user;
    console.log(nickname);
    const newChat = await chatQuery.createChat({ chat, RoomsId, PostChatID });
    return { newChat, nickname, snsId };
  },
};

export { chatLogic };
