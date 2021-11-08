import { DELETE_FULL_CART } from './constants';

function deleteFullCart() {
    console.log("ACTION")

  return {
    type: DELETE_FULL_CART
  };
}

export default deleteFullCart;