import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { searchReducer } from './search';
import { userReducer } from './user';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
});

export default rootReducer;
