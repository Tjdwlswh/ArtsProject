import { Sequelize } from 'sequelize';

class Hashtag extends Sequelize.Model {
  static initiate(sequelize) {
    Hashtag.init(
      {
        tag: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Hashtag',
        tableName: 'hashtags',
        // paranoid:false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.Hashtag.belongsToMany(db.Upload, { through: 'UploadHashtag' });
    db.Hashtag.belongsToMany(db.Deal, { through: 'DealHashtag' });
  }
}

export { Hashtag };
