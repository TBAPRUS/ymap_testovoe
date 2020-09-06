const { Router } = require('express');

const { login, register, logout, me } = require('../../../controllers/user');

const { auth } = require('../../../middleware/auth');

const router = Router();

router.post('/login', login);
router.get('/logout', auth(), logout);
router.post('/register', register);
router.get('/me', auth(), me);

exports.user = router;
