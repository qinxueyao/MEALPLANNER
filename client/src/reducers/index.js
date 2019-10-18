import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import recipes from './recipes';
import list from './list';

export default combineReducers({
  alert,
  auth,
  profile,
  recipes,
  list
});
