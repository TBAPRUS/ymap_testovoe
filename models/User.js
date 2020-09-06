const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      minlength: 4,
      maxlength: 24,
      required: [true, 'Пожалуйста укажите логин'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,24}$/,
        'The password must contain from 6 to 24 characters, at least 1 number, 1 lowercase Latin letter and 1 uppercase Latin letter',
      ],
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

exports.User = mongoose.model('User', UserSchema);
