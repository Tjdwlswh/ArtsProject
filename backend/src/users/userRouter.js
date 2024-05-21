import express from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/passport/loginGuard.js';
import { userController } from './userController.js';
import { upload, imgUploadRouter } from '../imgUploadRouter/imgUploadRouter.js';

const userRouter = express.Router();
const imgUpload = upload.single('image');

userRouter.post('/auth/register', isNotLoggedIn, imgUpload, userController.join);
userRouter.post('/auth/login', isNotLoggedIn, userController.login);
userRouter.get('/auth/logout', isLoggedIn, userController.logout);
userRouter.get('/', isLoggedIn, userController.getUserInfo);
userRouter.put('/profile/AccountEdit', isLoggedIn, imgUpload, userController.editUserInfo);
//카카오 로그인

userRouter.get('/auth/kakao/login', userController.KakaoAuthenticate);
userRouter.get('/auth/kakao/callback', userController.KakaoCallbackAuthenticate);

export { userRouter };
