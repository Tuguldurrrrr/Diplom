const router = require('express').Router();
const pageController = require('../controllers/pageController');
const serviceController = require('../controllers/serviceController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', pageController.home);
router.get('/about', pageController.about);

router.get('/dashboard', isAuthenticated, pageController.dashboardMain);
router.get('/dashboard/customer', isAuthenticated, authorizeRoles('customer'), pageController.customerDashboard);
router.get('/dashboard/operator', isAuthenticated, authorizeRoles('operator'), pageController.operatorDashboard);
router.get('/dashboard/content-manager', isAuthenticated, authorizeRoles('content_manager'), serviceController.pendingList);
router.get('/dashboard/admin', isAuthenticated, authorizeRoles('admin'), pageController.adminDashboard);

router.get('/admin', isAuthenticated, authorizeRoles('admin'), pageController.adminDashboard);
router.get('/reports', isAuthenticated, authorizeRoles('admin', 'content_manager'), pageController.reportPage);

module.exports = router;
