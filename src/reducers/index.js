import { ADD_TO_CART, DELETE_FROM_CART, DELETE_FULL_CART } from "../actions/constants";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

// Modify the reducer in order to receive the actions
const reducer = function (state = initialState, action) {
  if (action.type === ADD_TO_CART) {
    if (state.cart.find((item) => item.product === action.payload.product)) {
      const item = state.cart.find((item) => item.product === action.payload.product);
      const newItem = {...item, quantity: item.quantity + action.payload.quantity};
      let newCart = state.cart.filter((item) => item.product !== action.payload.product);
      newCart = [...newCart, newItem];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      }
    }
    const cart = [...state.cart, action.payload];
    localStorage.setItem("cart", JSON.stringify(cart));
    return {
      ...state,
      cart,
    };
  } else if (action.type === DELETE_FROM_CART) {
    console.log(action.payload)
    const newCart = () => {
      let newCart;
      newCart = state.cart.filter((item) => item.idx !== action.payload);
      newCart = newCart.map((item, index) => {
        return { ...item, idx: index };
      })
      console.log(newCart)
      return newCart;
    };
    localStorage.setItem("cart", JSON.stringify(newCart()));
    return {
      ...state,
      cart: newCart(),
    };
  } else if (action.type === DELETE_FULL_CART) {
    console.log("REDUCER")

    localStorage.removeItem("cart");
    return {
      ...state,
      cart: [],
    };
  }
  return state;
};

export default reducer;
