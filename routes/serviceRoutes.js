const router = require('express').Router();
const serviceController = require('../controllers/serviceController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', serviceController.list);
router.get('/operator/:id/profile', serviceController.operatorProfile);
router.get('/operator/create/new', isAuthenticated, authorizeRoles('operator'), serviceController.createPage);
router.post('/operator/create/new', isAuthenticated, authorizeRoles('operator'), serviceController.create);
router.get('/operator/:id/edit', isAuthenticated, authorizeRoles('operator'), serviceController.editPage);
router.put('/operator/:id/edit', isAuthenticated, authorizeRoles('operator'), serviceController.edit);
router.delete('/operator/:id/delete', isAuthenticated, authorizeRoles('operator'), serviceController.remove);
router.post('/:id/approve', isAuthenticated, authorizeRoles('content_manager'), serviceController.approve);
router.post('/:id/reject', isAuthenticated, authorizeRoles('content_manager'), serviceController.reject);
router.get('/:id', serviceController.detail);

module.exports = router;
