import multer from "multer";
import fs from "fs";
import path from "path";

const uploadPath = path.join(process.cwd(), "public");

// Ensure the folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // or add timestamp to avoid overwrites
  },
});

export const upload = multer({ storage });
