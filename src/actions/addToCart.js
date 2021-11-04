import { ADD_TO_CART } from './constants';

function addToCart(product) {
  const cart = localStorage.getItem('cart') || [];
  const newProduct = {
    idx: cart.length !== 0 ? JSON.parse(cart).length : 0,
    ...product
  }
  return {
    type: ADD_TO_CART,
    payload: newProduct,
  };
}

export default addToCart;