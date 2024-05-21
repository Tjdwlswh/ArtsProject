import { Sequelize } from 'sequelize';

class AllChat extends Sequelize.Model {
  static initiate(sequelize) {
    AllChat.init(
      {
        chat: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        gif: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        create_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'AllChat',
        tableName: 'allChats',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.AllChat.belongsTo(db.Rooms, {
      foreignKey: 'RoomsId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.AllChat.belongsTo(db.User, {
      foreignKey: 'PostChatID',
      targetKey: 'id',
    });
  }
}

export { AllChat };
