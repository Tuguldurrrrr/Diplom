const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { uploadFile } = require('../controllers/uploadController');
const { authenticate, authorize } = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), 'uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`)
});

const upload = multer({ storage });
router.post('/', authenticate, authorize('Operator'), upload.single('file'), uploadFile);

module.exports = router;
