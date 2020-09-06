const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Пожалуйста укажите владельца'],
    },
    name: {
      type: String,
      required: [true, 'Пожалуйста укажите название'],
    },
    latitude: {
      type: Number,
      required: [true, 'Пожалуйста укажите долготу'],
    },
    longitude: {
      type: Number,
      required: [true, 'Пожалуйста укажите широту'],
    },
  },
  {
    versionKey: false,
  }
);

exports.Location = mongoose.model('Location', LocationSchema);
