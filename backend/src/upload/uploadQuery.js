import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const uploadQuery = {
  create: async newUpload => {
    return await db.Upload.create(newUpload);
  },

  findOne: async ({ nickname, postId }) => {
    // console.log("postId:", postId);
    // const id = parseInt(postId);
    // console.log("Parsed id:", id);

    const result = await db.Upload.findOne({
      where: { id: postId },
      include: [
        {
          model: db.User,
          where: {
            nickname: nickname,
          },
          attributes: ['nickname', 'id'],
        },
      ],
    });
    console.log('ㅇㄹㅇㄴㄹㄴㅇㄹㄴㅇㄹ', result);

    return result;
  },

  findAll: async ({ userId }) => {
    const result = await db.Upload.findAll({
      where: { postUserId: userId },
    });

    return result;
  },
  findPosts: async ({}) => {
    const result = await db.Upload.findAll({
      include: [
        {
          model: db.User,
          attributes: ['nickname', 'id'],
        },
      ],
    });
    return result;
  },
  update: async ({ toUpdate, postId }) => {
    const updateUpload = await db.Upload.update(toUpdate, {
      where: { id: postId },
    });
    return updateUpload;
  },

  delete: async ({ postId }) => {
    const deleteData = await db.Upload.destroy({ where: { id: postId } });
    return deleteData;
  },
};

export { uploadQuery };
