import { promises as fsPromises } from 'fs';
import path from 'path';

const deleteFile = async fileName => {
  const filePath = path.join('./uploads', fileName);
  console.log(filePath);

  try {
    await fsPromises.unlink(filePath);
    console.log('파일 삭제 성공:', fileName);
  } catch (err) {
    console.error('파일 삭제 실패:', err);
  }
};

export { deleteFile };
