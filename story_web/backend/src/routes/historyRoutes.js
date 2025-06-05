const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.post('/', historyController.addReadingHistory);
router.get('/:userId', historyController.getReadingHistory);
router.delete('/:userId/:chapterId', historyController.deleteReadingHistory);

module.exports = router;