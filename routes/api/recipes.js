const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Recipe = require('../../models/Recipe');

// @route    POST api/recipes
// @desc     Create or Update a recipe
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('prep_time', 'Preparation time is required')
        .not()
        .isEmpty(),
      check('cook_time', 'Cook time is required')
        .not()
        .isEmpty(),
      check('for_how_many', 'Please indicate the number of people')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, prep_time, cook_time, for_how_many } = req.body;

    const recipeFields = {};
    recipeFields.user = req.user.id;
    if (title) recipeFields.title = title;
    if (prep_time) recipeFields.prep_time = prep_time;
    if (cook_time) recipeFields.cook_time = cook_time;
    if (for_how_many) recipeFields.for_how_many = for_how_many;

    try {
      let recipe = await Recipe.findOneAndUpdate(
        { user: req.user.id },
        { $set: recipeFields },
        { new: true, upsert: true }
      );
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/recipes/ingredients
// @desc     Add recipe ingredients
// @access   Private
router.put(
  '/ingredients',
  [
    auth,
    [
      check('item_name', 'Name is required')
        .not()
        .isEmpty(),
      check('quantity', 'Quantity is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { item_name, quantity } = req.body;
    const newIngredient = { item_name, quantity };

    try {
      const recipe = await Recipe.findOne({ user: req.user.id });
      recipe.ingredients.unshift(newIngredient);
      await recipe.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/recipes/prep_work
// @desc     Add recipe prep work
// @access   Private
router.put(
  '/prep_work',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;
    const newStep = { text };

    try {
      const recipe = await Recipe.findOne({ user: req.user.id });
      recipe.prep_work.unshift(newStep);
      await recipe.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/recipes/steps
// @desc     Add recipe steps
// @access   Private
router.put(
  '/steps',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, image } = req.body;
    const newStep = { text, image };

    try {
      const recipe = await Recipe.findOne({ user: req.user.id });
      recipe.steps.unshift(newStep);
      await recipe.save();
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/recipes
// @desc     Get all recipes
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .sort({ date: -1 })
      .populate('user', 'username');
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/recipes/me
// @desc     Get all recipes of current user
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id })
      .sort({ date: -1 })
      .populate('user', 'username');
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/recipes/user/:user_id
// @desc     Get all recipes of this user
// @access   Private
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.params.user_id })
      .sort({ date: -1 })
      .populate('user', 'username');
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/recipes/:id
// @desc     Get recipes by recipe ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      'user',
      'username'
    );

    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/recipes/:id
// @desc     Delete a recipe
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    // Check user
    if (recipe.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await recipe.remove();

    res.json({ msg: 'Recipe removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/recipes/ingredients/:ingre_id
// @desc     Delete ingredient from recipe
// @access   Private
router.delete('/ingredients/:ingre_id', auth, async (req, res) => {
  try {
    const foundRecipe = await Recipe.findOne({ user: req.user.id });
    const ingreIds = foundRecipe.ingredients.map(ingre => ingre._id.toString());
    const removeIndex = ingreIds.indexOf(req.params.ingre_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      foundRecipe.ingredients.splice(removeIndex, 1);
      await foundRecipe.save();
      return res.status(200).json(foundRecipe);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    DELETE api/recipes/prep_work/:prep_id
// @desc     Delete prep work from recipe
// @access   Private
router.delete('/prep_work/:prep_id', auth, async (req, res) => {
  try {
    const foundRecipe = await Recipe.findOne({ user: req.user.id });
    const prepIds = foundRecipe.prep_work.map(step => step._id.toString());
    const removeIndex = prepIds.indexOf(req.params.prep_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      foundRecipe.prep_work.splice(removeIndex, 1);
      await foundRecipe.save();
      return res.status(200).json(foundRecipe);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    DELETE api/recipes/steps/:step_id
// @desc     Delete a step from recipe
// @access   Private
router.delete('/steps/:step_id', auth, async (req, res) => {
  try {
    const foundRecipe = await Recipe.findOne({ user: req.user.id });
    const stepIds = foundRecipe.steps.map(step => step._id.toString());
    const removeIndex = stepIds.indexOf(req.params.step_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      foundRecipe.steps.splice(removeIndex, 1);
      await foundRecipe.save();
      return res.status(200).json(foundRecipe);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/recipes/like/:id
// @desc     Like a recipe
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    // Check if the post has already been liked
    if (
      recipe.likes.filter(like => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'You already liked this recipe' });
    }

    recipe.likes.unshift({ user: req.user.id });

    await recipe.save();

    res.json(recipe.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/recipes/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    // Check if the post has already been liked
    if (
      recipe.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Recipe has not yet been liked' });
    }

    // Get remove index
    const removeIndex = recipe.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    recipe.likes.splice(removeIndex, 1);

    await recipe.save();

    res.json(recipe.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/recipes/comment/:id
// @desc     Comment on a recipe
// @access   Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const recipe = await Recipe.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        username: user.username,
        avatar: user.avatar,
        user: req.user.id
      };

      recipe.comments.unshift(newComment);

      await recipe.save();

      res.json(recipe.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/recipes/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    // Pull out comment
    const comment = recipe.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = recipe.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    recipe.comments.splice(removeIndex, 1);

    await recipe.save();

    res.json(recipe.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
