const router = require('express').Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/create/:serviceId', isAuthenticated, authorizeRoles('customer'), orderController.createPage);
router.post('/create/:serviceId', isAuthenticated, authorizeRoles('customer'), orderController.create);
router.get('/history', isAuthenticated, orderController.history);
router.post('/:id/status', isAuthenticated, authorizeRoles('operator'), orderController.updateStatus);
router.get('/:orderId/upload', isAuthenticated, authorizeRoles('operator', 'customer'), orderController.uploadPage);
router.post('/:orderId/upload', isAuthenticated, authorizeRoles('operator'), upload.single('file'), orderController.upload);

module.exports = router;
