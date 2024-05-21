import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import { sequelize } from '../models/index.js';
import { passportConfig } from './middlewares/passport/index.js';
import { userRouter } from './users/userRouter.js';
import { uploadRouter } from './upload/uploadRouter.js';
import { chatRouter } from './chat/chatRouter.js';
import fs from 'fs';

dotenv.config();

const app = express();
passportConfig();
app.use(cors({ origin: true, credentials: true }));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('아싸! MySQL 연결 성공');
  })
  .catch(err => {
    console.error(err);
    console.log('에러');
  });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 4 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
});
app.use(sessionMiddleware);

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/fileUpload', express.static(path.join(__dirname, 'fileUpload')));

app.use(passport.initialize());
app.use(passport.session());

app.use([userRouter, uploadRouter, chatRouter]);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    error: err.message,
  });
});

export { app };
