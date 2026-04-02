const router = require('express').Router();
const { getServices, reviewService } = require('../controllers/serviceController');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/', getServices);
router.patch('/:id/review', authenticate, authorize('ContentManager'), reviewService);

module.exports = router;
