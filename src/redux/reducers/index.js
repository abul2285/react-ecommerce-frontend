import { combineReducers } from 'redux';
import { searchReducer } from './search';
import { userReducer } from './user';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

export default rootReducer;
