import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import { orderCreateReducer, orderDetailsReducer, orderMyListReducer, orderPayReducer } from './reducers/orderReducer';
import {
 productDeleteReducer,
 productDetailsReducer,
 productListReducer,
} from './reducers/productReducer';
import {
 userLoginReducer,
 userRegisterReducer,
 userDetailsReducer,
 userUpdateProfileReducer,
 userListReducer,
 userDeleteReducer,
 userUpdateReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
 productList: productListReducer,
 productDetails: productDetailsReducer,
 cart: cartReducer,
 userLogin: userLoginReducer,
 userRegister: userRegisterReducer,
 userDetails: userDetailsReducer,
 userUpdateProfile: userUpdateProfileReducer,
 orderCreate: orderCreateReducer,
 orderDetails: orderDetailsReducer,
 orderPay: orderPayReducer,
 orderMyList: orderMyListReducer,
 userList: userListReducer,
 userDelete: userDeleteReducer,
 userUpdate: userUpdateReducer,
 productDelete: productDeleteReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
 ? JSON.parse(localStorage.getItem('cartItems'))
 : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
 ? JSON.parse(localStorage.getItem('userInfo'))
 : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
 ? JSON.parse(localStorage.getItem('shippingAddress'))
 : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
 ? JSON.parse(localStorage.getItem('paymentMethod'))
 : 'paypal';

const initialState = {
 cart: {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
 },
 userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
 reducer,
 initialState,
 composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
