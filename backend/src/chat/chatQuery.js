import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const chatQuery = {
  create: async ({ title, max, password, owner }) => {
    return await db.Rooms.create({ title, max, password, owner });
  },
  findRooms: async ({ nickname }) => {
    return await db.Rooms.findAll({
      where: { owner: nickname },
    });
    //Rooms가 owner로 만들 채팅방이 있는지 확인
  },

  findId: async ({ UserId }) => {
    return await db.User.findOne({
      where: {
        id: UserId,
      },
    });
  },
  findAll: async () => {
    return await db.Rooms.findAll({});
  },
  findRoom: async ({ id }) => {
    return await db.Rooms.findOne({
      where: {
        id,
      },
    });
  },

  deleteRoom: async ({ id }) => {
    return await db.Rooms.destroy({
      where: {
        id,
      },
    });
  },
  deleteChat: async ({ id }) => {
    return await db.AllChat.destroy({
      where: {
        id,
      },
    });
  },

  createChat: async ({ chat, RoomsId, PostChatID }) => {
    return await db.AllChat.create({
      RoomsId,
      PostChatID,
      chat,
    });
  },
  chatFindOne: async ({ id }) => {
    return await db.AllChat.findOne({
      where: { id },
      include: [{ model: db.User, attributes: ['nickname', 'id', 'snsId'] }],
    });
  },
};

export { chatQuery };

// Rooms 모델에 title, max, owner, password 총 4가지가 들어가야 함,
// 그러면 count 를 max 로 전체 바꿔주고, owner는 어디서 가져오는지 책에서 보기
// const chats = await db.AllChat.findAll({where:{
//     RoomsId:room.id
// },
// include:[
//     {model:db.User, attributes:['nickname', 'id','snsId']}
// ],
// order:[['create_at', 'ASC']]
// })
