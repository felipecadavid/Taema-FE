import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import './CartPage.css'

import axios from "../../utils/axios";

import CartProduct from "../../components/CartProduct/CartProduct";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const [state, setState] = useState({
    cart: cart,
    products: [],
    loading: true,
  });

  useEffect(() => {
    console.log("CartPage useEffect");
    setState({ ...state, loading: true });
    async function getProducts() {
      const products = await axios.get(`/api/products/getAList`, {
        params: cart
      });
      setState((prevState) => ({
        ...prevState,
        products: products.data,
        loading: false,
      }));
    }
    getProducts();
  }, [cart]);

  const { products, loading } = state;
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="cart-page">
          {products.length ? <>{products.map((product, index) => (
            <CartProduct key={index} productInCartIndex={index} product={product} />
          ))}
          <button className="cart-page__button" type="button">Comprar</button></> :
            <div className="cart-page__empty">
              <h2>No hay productos en el carrito</h2>
              <p>Puedes agregar productos al carrito desde la sección de productos</p>
            </div>
          }
        </div>
      )}
    </>
  );
}

export default CartPage;
