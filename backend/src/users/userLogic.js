import { UserQuery } from './userQuery.js';
import bcrypt from 'bcrypt';
import { ConflictException } from '../libs/httpException.js';
import { deleteFile } from '../libs/controlFile.js';

const userLogic = {
  addUser: async ({ email, nickname, password }) => {
    const duplicateFields = [];
    const exUser = await UserQuery.findByDuplicate(email, nickname);

    if (exUser) {
      if (exUser.email === email) {
        duplicateFields.push('email');
      }
      if (exUser.nickname === nickname) {
        duplicateFields.push('nickName');
      }

      const errorMessage = `이미 사용 중인 ${duplicateFields.join(', ')}입니다.`;

      throw new ConflictException(errorMessage);
    }
    const hash = await bcrypt.hash(password, 12);

    const newUser = {
      email,
      nickname,
      password: hash,
    };
    return UserQuery.create(newUser);
  },

  getUser: async email => {
    const user = await UserQuery.findByEmail(email);
    delete user.dataValues.password;
    delete user.dataValues.deletedAt;
    delete user.dataValues.updatedAt;
    console.log(user);
    return user;
  },
  editUser: async ({ data, email }) => {
    for (const [key, value] of Object.entries(data)) {
      if (value === '') {
        delete data[key];
      }
    }
    if (data.image === 'delete') {
      data.profileImg = '';
      const { profileImg } = await UserQuery.findByEmail(email);
      deleteFile(profileImg);
    } else {
      const { profileImg } = await UserQuery.findByEmail(email);
      if (profileImg) {
        deleteFile(profileImg);
      }
    }
    const editedUser = await UserQuery.update(data, email);
    console.log(editedUser);
    return editedUser;
  },

  getKakaoUser: async snsId => {
    const user = await UserQuery.findBysnsId(snsId);

    return user;
  },
};

export { userLogic };
