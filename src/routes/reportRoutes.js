const router = require('express').Router();
const { monthlyReport } = require('../controllers/reportController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/monthly', authenticate, authorize('Admin'), monthlyReport);

module.exports = router;
