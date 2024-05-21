import { Router } from 'express';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/passport/loginGuard.js';
import { fileUpload } from '../imgUploadRouter/fileUploadRouter.js';
import { uploadController } from './uploadController.js';

const uploadRouter = Router();
const fileImgUpload = fileUpload.single('image');

//업로드 생성
uploadRouter.post('/fileUpload', isLoggedIn, fileImgUpload, uploadController.postUpload);

uploadRouter.get('/upload/:nickname/:postId', uploadController.getUpload);

uploadRouter.get('/uploads', uploadController.getUploadsAll);

uploadRouter.get('/posts', uploadController.getPostsAll);

uploadRouter.put(
  '/edit/:nickname/:postId',
  isLoggedIn,
  fileImgUpload,
  uploadController.updateUpload,
);

uploadRouter.delete(
  '/upload/delete/:nickname/:postId',
  isLoggedIn,
  uploadController.deleteMyUpload,
);

export { uploadRouter };
