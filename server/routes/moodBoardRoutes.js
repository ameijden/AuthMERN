const express = require('express');
const router = express.Router();

//Controller Imports
var { ensureSignedIn } = require('../controllers/authController');
var moodBoardController = require('../controllers/moodBoardController');

//All routes after this are protected

router.post('/', ensureSignedIn, moodBoardController.createMoodBoard);
router.get('/latest', moodBoardController.getLatestBoards);
router.get('/resources', moodBoardController.getImageResources);
router.get('/user/:user', moodBoardController.getMoodBoardsByUser);
router.get('/:id', moodBoardController.getMoodBoardById);
router.delete('/:id', ensureSignedIn, moodBoardController.deleteMoodBoardById);

module.exports = router;
