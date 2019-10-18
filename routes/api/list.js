const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Recipe = require('../../models/Recipe');
const List = require('../../models/List');

// @route    POST api/list
// @desc     Create or Update user list
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const newList = new List({
      user: req.user.id
    });

    const list = await newList.save();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/list/recipe/:id
// @desc     Add a recipe to the list by recipe ID
// @access   Private
router.put('/recipe/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(400).json({ msg: 'Recipe not found' });
    }
    const list = await List.findOne({ user: req.user.id });
    list.recipes.unshift({
      recipe: req.params.id,
      title: recipe.title,
      ingredients: recipe.ingredients
    });

    await list.save();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/list/me
// @desc     get current users list
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const list = await List.findOne({ user: req.user.id }).populate(
      'user',
      'username'
    );
    if (!list) {
      return res.status(400).json({ msg: 'There is no list for this user' });
    }
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/list/recipe/:id
// @desc     Delete a recipe from the list by recipe ID (for this list)
// @access   Private
router.delete('/recipe/:id', auth, async (req, res) => {
  try {
    const foundList = await List.findOne({ user: req.user.id });
    const recipeIds = foundList.recipes.map(recipe => recipe._id.toString());
    const removeIndex = recipeIds.indexOf(req.params.id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      foundList.recipes.splice(removeIndex, 1);
      await foundList.save();
      return res.status(200).json(foundList);
    }
  } catch (err) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    DELETE api/list
// @desc     Delete the list
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    await List.findOneAndRemove({ user: req.user.id });
    res.json({ msg: 'List deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
