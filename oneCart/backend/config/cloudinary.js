// file: utils/cloudinaryUploader.js or similar

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Create /public if it doesn't exist
const uploadPath = path.join(process.cwd(), 'public');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ✅ Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export const upload = multer({ storage });

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Upload function
export const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath || !fs.existsSync(filePath)) {
      console.warn("⚠️ Invalid or missing file path for Cloudinary upload.");
      return null;
    }

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto"
    });

    fs.unlinkSync(filePath); // delete local file
    return result.secure_url;

  } catch (error) {
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn("⚠️ Failed to delete file on error:", err);
      }
    }
    console.error("❌ Cloudinary Upload Error:", error);
    throw error;
  }
};

export default cloudinary;
