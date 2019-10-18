import axios from 'axios';

import {
  CREATE_LIST,
  GET_LIST,
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  CLEAR_LIST,
  LIST_ERROR
} from './types';

// Create shopping list
export const createList = () => async dispatch => {
  try {
    const res = await axios.post('/');

    dispatch({
      type: CREATE_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get the shopping list
export const getList = () => async dispatch => {
  try {
    const res = await axios.get('api/list/me');

    dispatch({
      type: GET_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Add recipe to shopping list
export const addToList = recipeId => async dispatch => {
  try {
    const res = await axios.get(`api/list/recipe/${recipeId}`);

    dispatch({
      type: ADD_TO_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove a recipe from list

// Remove all recipes from list
