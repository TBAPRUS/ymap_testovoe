const { Router } = require('express');

const { auth } = require('../../../middleware/auth');

const {
  getLocations,
  updateLocation,
  createLocation,
  deleteLocation,
} = require('../../../controllers/location');

const router = Router();

router.use(auth());

router.route('/').get(getLocations).post(createLocation);

router.route('/:id').put(updateLocation).delete(deleteLocation);

exports.location = router;
