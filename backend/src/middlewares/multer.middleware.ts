import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const uploadDir = path.join(__dirname, '../../public/uploads');
const groupImagesDir = path.join(uploadDir, 'groupImages');
const profileImagesDir = path.join(uploadDir, 'profileImages');
const expenseImagesDir = path.join(uploadDir, 'expenseImages');

[groupImagesDir, profileImagesDir, expenseImagesDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profileImage') cb(null, profileImagesDir);
    else if (file.fieldname === 'groupImage') cb(null, groupImagesDir);
    else if (file.fieldname === 'expenseImage') cb(null, expenseImagesDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
