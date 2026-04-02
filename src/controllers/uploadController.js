const fileModel = require('../models/fileModel');
const bookingModel = require('../models/bookingModel');

async function uploadFile(req, res) {
  try {
    const { booking_id } = req.body;
    if (!req.file) return res.status(400).json({ message: 'File missing' });

    await fileModel.saveFile({
      booking_id,
      file_name: req.file.originalname,
      file_path: `/uploads/${req.file.filename}`,
      uploaded_by: req.user.id
    });

    await bookingModel.updateStatus(booking_id, 'Completed');
    res.json({ message: 'File uploaded', file: `/uploads/${req.file.filename}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { uploadFile };
