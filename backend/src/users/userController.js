import passport from 'passport';
import { userLogic } from './userLogic.js';

const userController = {
  join: async (req, res, next) => {
    try {
      console.log(req.file);
      const { email, nickname, password } = req.body;
      const profileImg = req.file ? req.file.filename : undefined;
      const newUser = await userLogic.addUser({ email, nickname, password, profileImg });

      if (newUser.errMessage) {
        throw new Error(newUser.errMessage);
      }
      return res.status(201).json(newUser);
    } catch (error) {
      return next(error);
    }
  },

  login: async (req, res, next) => {
    console.log(req.file);
    console.log(req.user);
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        return next(authError);
      }
      if (!user) {
        const error = new Error(info.message);
        error.status = 403;
        return next(error);
      }
      return req.login(user, loginError => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        res.status(200).json({ message: '로그인 성공' });
      });
    })(req, res, next);
  },

  KakaoAuthenticate: async (req, res, next) => {
    passport.authenticate('kakao')(req, res, next);
  },

  KakaoCallbackAuthenticate: async (req, res, next) => {
    passport.authenticate(
      'kakao',
      { failureRedirect: `${process.env.FRONT_URL}/auth/login` },

      (err, user, info) => {
        if (err) {
          return res.status(403).redirect(`${process.env.FRONT_URL}/auth/login?status=fail`);
        }

        return req.login(user, loginError => {
          if (loginError) {
            console.error(loginError);
            return next(loginError);
          }
          res.status(303).redirect(`${process.env.FRONT_URL}`);
        });
      },
    )(req, res, next);
  },

  logout: async (req, res, next) => {
    try {
      req.logout(() => {
        req.session.destroy(err => {
          if (err) {
            return next(err);
          }
        });
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
        res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
        res.setHeader('Expires', '0'); // Proxies.
        res.status(200).json({ message: '로그아웃 성공' });
      });
    } catch (err) {
      next(err);
    }
  },

  getUserInfo: async (req, res, next) => {
    try {
      const { email } = req.user;
      const user = await userLogic.getUser(email);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  editUserInfo: async (req, res, next) => {
    try {
      console.log('file =', req.file);
      const { email } = req.user;
      const { nickname, image } = req.body;
      const profileImg = req.file ? req.file.filename : undefined;
      const data = { nickname, profileImg, image };
      const editedUser = await userLogic.editUser({ data, email });
      const user = await userLogic.getUser(email);
      res.status(200).json({ message: '수정이 완료되었습니다.', editedUser, user });
    } catch (err) {
      next(err);
    }
  },
};

export { userController };
