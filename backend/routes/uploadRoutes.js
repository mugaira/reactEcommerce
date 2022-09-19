import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
 destination(req, file, cb) {
  cb(null, 'uploads');
 },
 filename(req, file, cb) {
  cb(
   null,
   `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
  );
 },
});

function checkFileType(file, cb) {
 const filetype = /jpeg|jpg|png/;
 const extname = filetype.test(path.extname(file.originalname).toLowerCase());
 const mimetype = filetype.test(file.mimetype);

 if (extname && mimetype) {
  cb(null, true);
 } else {
  cb('Only image are allowed');
 }
}

const upload = multer({
 storage,
 fileFilter: function (req, file, cb) {
  checkFileType(file, cb);
 },
});

router.post('/', upload.single('image'), (req, res) => {
 res.json(`${req.file.path}`);
});

export default router;
