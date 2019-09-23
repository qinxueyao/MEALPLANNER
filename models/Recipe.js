const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  prep_time: {
    type: String,
    required: true
  },
  cook_time: {
    type: String,
    required: true
  },
  for_how_many: {
    type: String,
    required: true
  },
  ingredients: [
    {
      item_name: {
        type: String,
        required: true
      },
      quantity: {
        type: String,
        required: true
      }
    }
  ],
  prep_work: [
    {
      text: {
        type: String,
        required: true
      }
    }
  ],
  steps: [
    {
      text: { type: String, required: true },
      image: { type: String }
    }
  ],
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
