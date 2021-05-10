const express = require('express');
const router = express.Router();

//Controller Imports
var { ensureSignedIn } = require('../controllers/authController');
var userController = require('../controllers/userController');

//All routes after this are protected
router.use(ensureSignedIn);

router.post('/favourites', userController.addBoardToFavourites);
router.get('/favourites/:type', userController.getFavourites);
router.post('/set-home', userController.setBoardToHome);
router.delete('/favourites/all', userController.removeAllBoardsFromFavourites);
router.delete('/favourites/:id', userController.removeBoardFromFavourites);

module.exports = router;
