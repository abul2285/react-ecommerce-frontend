import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { searchReducer } from './search';
import { userReducer } from './user';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
});

export default rootReducer;
