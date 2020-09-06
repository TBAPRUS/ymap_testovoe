const { Router } = require('express');

const { api_v1 } = require('./api/v1/');
const { frontend } = require('./frontend');

const router = Router();

router.use('/api/v1', api_v1);
router.use(frontend);

exports.router = router;
