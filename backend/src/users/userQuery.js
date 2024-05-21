import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';

const UserQuery = {
  create: async newUser => {
    return await db.User.create(newUser);
  },

  findByDuplicate: async (email, nickname) => {
    const user = await db.User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email }, { nickname }],
      },
    });
    return user;
  },

  findByEmail: async email => {
    const user = await db.User.findOne({
      where: { email },
    });
    return user;
  },
  findBysnsId: async snsId => {
    const user = await db.User.findOne({
      where: { snsId },
    });
    return user;
  },
  update: async (data, email) => {
    const updatedUser = await db.User.update(data, { where: { email } });
    return updatedUser;
  },
};

export { UserQuery };
