const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  sex: {
    type: String
  },
  birthday: {
    type: Date
  },
  location: {
    type: String
  },
  occupation: {
    type: String
  },
  description: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
