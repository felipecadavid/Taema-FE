import { DELETE_FROM_CART } from './constants';

function deleteFromCart(product) {
  console.log("DELETE FROM CART");
  console.log(product)
  
  return {
    type: DELETE_FROM_CART,
    payload: product,
  };
}

export default deleteFromCart;