import { uploadQuery } from './uploadQuery.js';
import { hashtagQuery } from '../hashtags/hashtagQuery.js';
import { deleteFile } from '../libs/controlFile.js';

const uploadLogic = {
  addUpload: async ({ text, title, price, img, tags, postUserId }) => {
    const newUpload = { text, title, price, img, tags, postUserId };

    const createUpload = await uploadQuery.create(newUpload);

    if (tags) {
      console.log(tags);
      const hashtag = tags.split(',');
      console.log(hashtag);

      const newTag = await hashtagQuery.findOrCreate(hashtag);

      // 해시태그 모델을 업로드 모델과 연결

      await createUpload.addHashtags(newTag.map(t => t[0]));
    }

    return createUpload;
  },

  getUpload: async ({ nickname, postId }) => {
    const Upload = await uploadQuery.findOne({ nickname, postId });

    return Upload;
  },

  getAllUploads: async ({ userId }) => {
    const Uploads = await uploadQuery.findAll({ userId });

    return Uploads;
  },

  getAllPosts: async ({}) => {
    const Posts = await uploadQuery.findPosts({});
    return Posts;
  },

  updateUpload: async ({ nickname, postId, userId, img, toUpdate }) => {
    const Upload = await uploadQuery.findOne({ nickname, postId });
    if (toUpdate.image === 'delete') {
      img = '';
      deleteFile(Upload.img);
    }
    toUpdate['img'] = img;

    if (Upload && Upload.postUserId === userId) {
      await uploadQuery.update({ toUpdate, postId });

      if (toUpdate.tags) {
        const hashtag = Upload.tags.split(',');
        const newTag = await hashtagQuery.findOrCreate(hashtag);
        const updateUpload = await uploadQuery.findOne({ nickname, postId });

        await updateUpload.setHashtags(newTag.map(t => t[0]));
      }

      const updateUpload = await uploadQuery.findOne({ nickname, postId });
      console.log('nickname?', updateUpload);
      return updateUpload;
    } else {
      return false;
    }
  },
  deleteMyUpload: async ({ postId, nickname, userId }) => {
    const userData = await uploadQuery.findOne({ postId, nickname });
    if (userData && userData.postUserId === userId) {
      await uploadQuery.delete({ postId });
      const message = '업로드 삭제 완료';
      return message;
    }
    return { failMessage: '삭제 실패' };
  },
};

export { uploadLogic };
