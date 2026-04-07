const router = require('express').Router();
const authController = require('../controllers/authController');
const { handleValidation } = require('../middleware/validationMiddleware');

router.get('/register', authController.showRegister);
router.post('/register', authController.registerValidation, handleValidation, authController.register);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
