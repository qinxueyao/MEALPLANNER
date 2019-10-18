import {
  CREATE_LIST,
  GET_LIST,
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  CLAER_LIST,
  LIST_ERROR
} from '../actions/types';

const initialState = {
  recipes: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LIST:
      return {
        ...state,
        recipes: payload,
        loading: false
      };
    case GET_LIST:
      return {
        ...state,
        recipes: payload,
        loading: false
      };
    case ADD_TO_LIST:
      return {
        ...state,
        recipes: payload,
        loading: false
      };
    case LIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
