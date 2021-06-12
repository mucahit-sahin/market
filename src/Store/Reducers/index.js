import {combineReducers} from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import shopReducer from './shopReducer';

export default combineReducers({
  user: authReducer,
  cart: cartReducer,
  shop: shopReducer,
});
