const { Router } = require('express');

const { location } = require('./location.js');
const { user } = require('./user.js');

const router = Router();

router.use('/location', location);
router.use('/user', user);

exports.api_v1 = router;
