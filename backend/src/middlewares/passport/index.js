import passport from 'passport';
import { db } from '../../../models/index.js';
import { local } from './localStrategy.js';
import { Kakaopassport } from './KakaoStrategy.js';

const passportConfig = () => {
  passport.serializeUser((user, done) => {
    console.log(user.email, user.nickname, user.id);
    done(null, { id: user.id, email: user.email, nickname: user.nickname });
  });
  passport.deserializeUser(async (user, done) => {
    console.log(user);
    const result = await db.User.findOne({ where: { id: user.id } });
    console.log(result);
    done(null, result);
  });

  local();
  Kakaopassport();
};

export { passportConfig };
