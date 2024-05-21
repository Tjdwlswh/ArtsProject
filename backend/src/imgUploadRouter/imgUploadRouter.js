import { Router } from 'express';
import multer from 'multer';
import path from 'path';

// 사진을 지우려고 할 때 image는 'delete'문자로 옴. 그 외에는 파일 또는 undefined

const imgUploadRouter = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
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

const upload = multer({ storage: storage, limits: limits, fileFilter: filter });

//------------------여기까지 ok 위의 설정이 끝나면 upload 변수가 생긴다

imgUploadRouter.get('/getdata', (req, res, next) => {
  try {
    // JSON 파일의 경로
    const jsonPath = path.join(__dirname, 'data', 'output.json');

    res.status(200).json(require(jsonPath));
    return;
  } catch (err) {
    next(err);
  }
});

imgUploadRouter.get('/uploads/:filename', (req, res, next) => {
  try {
    console.log(req.file);
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;
    const options = {
      root: path.join('../backend'),
    };
    return res.sendFile(filePath, options);
  } catch (err) {
    next(err);
  }
});

export { upload, imgUploadRouter };
