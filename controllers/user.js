const { User } = require('../models/User');
const { asyncHandler } = require('../middleware/async');
const { ErrorResponse } = require('../utils/errorResponse');

// @desc      Register
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { login, password } = req.body;

  const user = await User.create({ login, password });

  sendTokenResponse(user, 200, res);
});

// @desc      Login
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { password, login } = req.body;

  if (!login || !password) {
    return next(new ErrorResponse('Пожалуйста укажите логин и пароль', 400));
  }

  const user = await User.findOne({ login: login }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Неверные данные', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Неверные данные', 401));
  }

  sendTokenResponse(user, 201, res);
});

// @desc      Logout
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler((req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, data: {} });
});

// @desc      Get current user
// @route     GET /api/v1/auth/me
// @access    Private
exports.me = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: req.user });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true });
};
