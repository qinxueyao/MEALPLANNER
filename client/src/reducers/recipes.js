import { GET_MY_RECIPES, RECIPE_ERROR, GET_RECIPE } from '../actions/types';

const initialState = {
  myrecipes: [],
  recipe: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MY_RECIPES:
      return {
        ...state,
        myrecipes: payload,
        loading: false
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: payload,
        loading: false
      };
    case RECIPE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
