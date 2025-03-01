const express = require('express');

const router = express.Router();
const controller = require('../controllers/index');
router.get('/', controller.login);
router.get('/home', controller.home);

router.get('/check-answer', controller.checkAnswer);
router.get('/play-again', controller.playAgain);
router.get('/update-score', controller.updateScore);
router.get('/random-image', controller.randomImage);
router.get('/invite', controller.Invite);
router.post('/register', controller.signup);
router.post('/login', controller.signin);
router.get('/sign-out', controller.signout);

module.exports = router;