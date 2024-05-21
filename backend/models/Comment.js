import { Sequelize } from 'sequelize';

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        comment: {
          type: Sequelize.STRING(200),
          allowNull: false,
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
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, {
      foreignKey: 'commenterId',
      targetKey: 'id',
    });
    db.Comment.belongsTo(db.Upload, {
      foreignKey: 'UploadId',
      targetKey: 'id',
    });
    db.Comment.belongsTo(db.Deal, {
      foreignKey: 'DealId',
      targetKey: 'id',
    });
  }
}

export { Comment };
