import axios from 'axios';
import { setAlert } from './alert';

import { GET_MY_RECIPES, GET_RECIPE, RECIPE_ERROR } from './types';

// Get current user's recipes
export const getCurrentUserRecipes = () => async dispatch => {
  try {
    const res = await axios.get('/api/recipes/me');

    dispatch({
      type: GET_MY_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get recipe details by recipe id
export const getRecipeByID = recipeId => async dispatch => {
  try {
    const res = await axios.get(`/api/recipes/${recipeId}`);

    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit recipe
export const editRecipe = () => async dispatch => {};

// Delete recipe
export const deleteRecipe = () => async dispatch => {};

// Like a recipe
export const likeRecipe = () => async dispatch => {};

// Create recipe
export const createRecipe = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('./api/recipes', formData, config);

    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Recipe Updated' : 'Recipe Created', 'success'));

    if (!edit) {
      history.push(`/recipes/${res.data._id}`);
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
