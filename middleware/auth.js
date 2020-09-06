const jwt = require('jsonwebtoken');

const { User } = require('../models/User');

const { asyncHandler } = require('./async');

const { ErrorResponse } = require('../utils/errorResponse');

exports.auth = () =>
  asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) return next(new ErrorResponse('У вас нет прав', 401));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof decoded === 'object')
        req.user = await User.findById(decoded.id);

      next();
    } catch (err) {
      next(err);
    }
  });
