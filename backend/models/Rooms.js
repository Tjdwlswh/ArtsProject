import { Sequelize } from 'sequelize';

class Rooms extends Sequelize.Model {
  static initiate(sequelize) {
    Rooms.init(
      {
        title: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        max: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 10,
          validate: {
            min: 2,
          },
        },
        owner: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(200),
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
        modelName: 'Rooms',
        tableName: 'rooms',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Rooms.hasMany(db.AllChat, { foreignKey: 'RoomsId', sourceKey: 'id' });
  }
}

export { Rooms };
