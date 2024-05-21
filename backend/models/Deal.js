import { Sequelize } from 'sequelize';

class Deal extends Sequelize.Model {
  static initiate(sequelize) {
    Deal.init(
      {
        deal: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Deal',
        tableName: 'Deals',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.Deal.belongsTo(db.User, {
      foreignKey: 'DealUserId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    db.Deal.belongsToMany(db.User, { through: 'LetDeal', as: 'LetDeals', onDelete: 'CASCADE' });
    db.Deal.belongsToMany(db.Hashtag, { through: 'DealHashtag', onDelete: 'CASCADE' });
    db.Deal.hasMany(db.Comment, { foreignKey: 'DealId', sourceKey: 'id', onDelete: 'CASCADE' });
  }
}

export { Deal };
