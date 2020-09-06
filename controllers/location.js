const { Location } = require('../models/Location');
const { asyncHandler } = require('../middleware/async');
const { ErrorResponse } = require('../utils/errorResponse');

// @desc      Get locations
// @route     GET /api/v1/location
// @access    Private
exports.getLocations = asyncHandler(async (req, res, next) => {
  const locations = await Location.find({ owner: req.user }).select('-owner');

  res.status(200).json({ success: true, data: locations });
});

// @desc      Create location
// @route     POST /api/v1/location
// @access    Private
exports.createLocation = asyncHandler(async (req, res, next) => {
  req.body.owner = req.user.id;

  const location = await Location.create(req.body);

  res.status(201).json({ success: true, data: location });
});

// @desc      Update Location
// @route     PUT /api/v1/location/:id
// @access    Private
exports.updateLocation = asyncHandler(async (req, res, next) => {
  let location = await Location.findById(req.params.id);

  if (!location) {
    return next(new ErrorResponse('Маркер не найден', 404));
  }

  if (!location.owner === req.user.id) {
    return next(new ErrorResponse('Вы не владелец этого маркера', 401));
  }

  location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: Location });
});

// @desc      Delete location
// @route     DELETE /api/v1/location/:id
// @access    Private
exports.deleteLocation = asyncHandler(async (req, res, next) => {
  let location = await Location.findById(req.params.id);

  if (!location) {
    return next(new ErrorResponse('Маркер не найден', 404));
  }

  if (!location.owner === req.user.id) {
    return next(new ErrorResponse('Вы не владелец этого маркера', 401));
  }

  await location.remove();

  res.status(200).json({ success: true, data: {} });
});
