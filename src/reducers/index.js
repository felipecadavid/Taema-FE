import { ADD_TO_CART, DELETE_FROM_CART } from "../actions/constants";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

// Modify the reducer in order to receive the actions
const reducer = function (state = initialState, action) {
  if (action.type === ADD_TO_CART) {
    console.log("ADD_TO_CART");
    console.log(!!state.cart.find((item) => item.product === action.payload.product));
    if (state.cart.find((item) => item.product === action.payload.product)) {
      const item = state.cart.find((item) => item.product === action.payload.product);
      console.log("ITEM: ", item);
      const newItem = {...item, quantity: item.quantity + action.payload.quantity};
      console.log("NEW ITEM: ", newItem);
      let newCart = state.cart.filter((item) => item.product !== action.payload.product);
      console.log("NEW CART: ", newCart);
      newCart = [...newCart, newItem];
      console.log("NEW CART: ", newCart);
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
    console.log("DELETE")
    console.log(action.payload)
    const newCart = () => {
      let newCart;
      console.log("IDX: ", state.cart[0].idx)
      newCart = state.cart.filter((item) => item.idx !== action.payload);
      newCart = newCart.map((item, index) => {
        return { ...item, idx: index };
      })
      console.log("NEW CART")
      console.log(newCart)
      return newCart;
    };
    console.log(newCart());
    localStorage.setItem("cart", JSON.stringify(newCart()));
    return {
      ...state,
      cart: newCart(),
    };
  }
  console.log("DEFAULT");
  return state;
};

export default reducer;
