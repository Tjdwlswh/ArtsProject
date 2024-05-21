import { Router } from 'express';
import multer from 'multer';
import path from 'path';

// 사진을 지우려고 할 때 image는 'delete'문자로 옴. 그 외에는 파일 또는 undefined

const fileImgUploadRouter = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'fileUpload');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});
const limits = { fieldsize: 5 * 1024 * 1024 };
const filter = (req, file, callback) => {
  const fileType = file.mimetype.split('/')[1];

  if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
    callback(null, true);
  } else {
    callback({ message: 'jpg, jpeg, png 확장자만 가능합니다.' }, false);
  }
};

const fileUpload = multer({ storage: storage, limits: limits, fileFilter: filter });

fileImgUploadRouter.get('/getdata', (req, res, next) => {
  try {
    // JSON 파일의 경로
    const jsonPath = path.join(__dirname, 'data', 'output.json');

    res.status(200).json(require(jsonPath));
    return;
  } catch (err) {
    next(err);
  }
});

fileImgUploadRouter.get('/fileUpload/:filename', (req, res, next) => {
  try {
    console.log(req.file);
    const filename = req.params.filename;
    const filePath = `fileUpload/${filename}`;
    const options = {
      root: path.join('../backend'),
    };
    return res.sendFile(filePath, options);
  } catch (err) {
    next(err);
  }
});

export { fileUpload, fileImgUploadRouter };
