const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  recipes: [
    {
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe'
      },
      title: String,
      ingredients: [
        {
          item_name: String,
          quantity: String
        }
      ]
    }
  ]
});

module.exports = List = mongoose.model('list', ListSchema);
