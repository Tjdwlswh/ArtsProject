import Sequelize from 'sequelize';
import { config } from '../config/config.js';
import { User } from './User.js';
import { Upload } from './Upload.js';
import { Comment } from './Comment.js';
import { Deal } from './Deal.js';
import { Hashtag } from './Hashtag.js';
import { Rooms } from './Rooms.js';
import { AllChat } from './AllChat.js';

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
});
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

db.sequelize = sequelize;

db.User = User;
db.Upload = Upload;
db.Deal = Deal;
db.Comment = Comment;
db.Hashtag = Hashtag;
db.Rooms = Rooms;
db.AllChat = AllChat;

User.initiate(sequelize);
Upload.initiate(sequelize);
Deal.initiate(sequelize);
Comment.initiate(sequelize);
Hashtag.initiate(sequelize);
Rooms.initiate(sequelize);
AllChat.initiate(sequelize);

User.associate(db);
Upload.associate(db);
Deal.associate(db);
Comment.associate(db);
Hashtag.associate(db);
Rooms.associate(db);
AllChat.associate(db);

export { db, sequelize };
