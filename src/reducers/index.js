import {
    ADD_TO_CART
  } from '../actions/constants';
  
  const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  };
  
  // Modify the reducer in order to receive the actions
  const reducer = function (state = initialState, action) {
    if(action.type === ADD_TO_CART) {
        const cart = [...state.cart, action.payload];
        localStorage.setItem('cart', JSON.parse(cart));
        return {
            ...state,
            cart,
        };
    }
    return state;
  };
  
  export default reducer;