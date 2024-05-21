import Sequelize from 'sequelize';

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        profileImg: {
          type: Sequelize.STRING(200),
          allowNull: true,
          defaultValue: 'defaultProfile.png',
        },
        provider: {
          type: Sequelize.ENUM('local', 'kakao', 'google'),
          allowNull: false,
          defaultValue: 'local',
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'user',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.User.hasMany(db.Upload, { foreignKey: 'postUserId', sourceKey: 'id' });
    db.User.hasMany(db.Deal, { foreignKey: 'DealUserId', sourceKey: 'id' });
    db.User.hasMany(db.AllChat, { foreignKey: 'PostChatID', sourceKey: 'id' });
    db.User.belongsToMany(db.Upload, {
      through: 'Likeit',
    });
    db.User.belongsToMany(db.Deal, {
      through: 'LetDeal',
    });
    db.User.hasMany(db.Comment, {
      foreignKey: 'commenterId',
      sourceKey: 'id',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
}

export { User };
