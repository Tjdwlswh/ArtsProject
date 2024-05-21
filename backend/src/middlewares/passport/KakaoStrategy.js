import passport from 'passport';
// import KakaoStrategy from 'passport-kakao'
import { Strategy } from 'passport-kakao';
import { User } from '../../../models/User.js';

const Kakaopassport = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.KAKAO_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('프로필', profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json?.kakao_account?.email,
              nickname: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            });
            return done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};

export { Kakaopassport };
