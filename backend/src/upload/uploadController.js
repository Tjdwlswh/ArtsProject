import { uploadLogic } from './uploadLogic.js';

const uploadController = {
  postUpload: async (req, res, next) => {
    try {
      console.log('body', req.body);
      console.log(req.file.filename);
      console.log(req.user.id);
      const { text, title, price, tags } = req.body;
      const img = req.file ? req.file.filename : undefined;
      const newUpload = await uploadLogic.addUpload({
        text,
        title,
        price,
        tags,
        img,
        postUserId: req.user.id,
      });
      if (newUpload.errMessage) {
        throw new Error(newUpload.errMessage);
      }
      return res.status(201).json(newUpload);
    } catch (err) {
      next(err);
    }
  },

  getUpload: async (req, res, next) => {
    try {
      let postId = req.params.postId;
      let nickname = req.params.nickname;
      console.log(nickname);
      console.log(postId);
      const Upload = await uploadLogic.getUpload({ nickname, postId });
      console.log('upload', Upload);
      return res.status(200).json(Upload);
    } catch (err) {
      next(err);
    }
  },

  getUploadsAll: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const Uploads = await uploadLogic.getAllUploads({ userId });
      return res.status(200).json(Uploads);
    } catch (err) {
      next(err);
    }
  },
  getPostsAll: async (req, res, next) => {
    try {
      const Posts = await uploadLogic.getAllPosts({});
      console.log(Posts);
      return res.status(200).json(Posts);
    } catch (err) {
      next(err);
    }
  },
  updateUpload: async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const nickname = req.params.nickname;
      console.log(nickname);
      const userId = req.user.id;
      const toUpdate = req.body;
      const img = req.file ? req.file.filename : undefined;
      console.log('컨트롤 :', postId);
      const Upload = await uploadLogic.updateUpload({ postId, nickname, userId, toUpdate, img });

      return res.status(200).json(Upload);
    } catch (err) {
      next(err);
    }
  },

  deleteMyUpload: async (req, res, next) => {
    try {
      const postId = req.params.postId;
      console.log('delete', postId.nickname);
      const nickname = req.params.nickname;
      const userId = req.user.id;
      console.log(userId);
      const deleteMyUpload = await uploadLogic.deleteMyUpload({ postId, userId, nickname });
      return res.status(200).json({ deleteMyUpload });
    } catch (err) {
      next(err);
    }
  },
};

export { uploadController };
