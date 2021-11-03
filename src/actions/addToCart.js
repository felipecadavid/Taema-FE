import { ADD_TO_CART } from '../constants/actionTypes';

function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product,
  };
}

export default addToCart;