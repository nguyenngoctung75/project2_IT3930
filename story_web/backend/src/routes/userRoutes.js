const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const authMiddleware = require('../middleware/authMiddleware');

router.get('/', userController.getAllUsers);
router.get('/stats', userController.getStats);
router.get('/:userId', userController.getUser);
router.put('/:userId', userController.updateUser);
router.put('/:userId/role', userController.updateUserRole);
router.delete('/:userId', userController.deleteUser);

module.exports = router;