import { Sequelize } from 'sequelize';

class Upload extends Sequelize.Model {
  static initiate(sequelize) {
    Upload.init(
      {
        text: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        tags: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        price: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Upload',
        tableName: 'Uploads',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.Upload.belongsTo(db.User, {
      foreignKey: 'postUserId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.Upload.belongsToMany(db.User, { through: 'Likeit', as: 'Likers', onDelete: 'CASCADE' });
    db.Upload.belongsToMany(db.Hashtag, { through: 'UploadHashtag', onDelete: 'CASCADE' });
    db.Upload.hasMany(db.Comment, { foreignKey: 'UploadId', sourceKey: 'id', onDelete: 'CASCADE' });
  }
}

export { Upload };
