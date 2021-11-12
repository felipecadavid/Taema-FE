import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import ReactImageMagnify from "react-image-magnify";

import history from "../../utils/history";

import "./ProductPage.css";
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import Swal from "sweetalert2";
import addToCart from "../../actions/addToCart";

function ProductPage(props) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const [state, setState] = useState({
    product: props.location.product,
    loading: props.location.product ? false : true,
    quantity: 1,
  });

  useEffect(() => {
    if (!props.location.product) {
      async function getProduct() {
        const id = props.match.params.product;
        const product = await axios.get(`/api/products/getOne/${id}`);
        if (!product.data.stock) {
          history.push("/");
        }
        setState((prevState) => ({
          ...prevState,
          product: product.data,
          loading: false,
        }));
      }
      getProduct();
    } else {
      if (!props.location.product.stock) {
        history.push("/");
      }
    }
  }, [props.location.product, props.match.params.product]);

  const handleChange = (e) => {
    let newValue;
    if (e.target.value < 1 && e.target.value !== "") newValue = 1;
    if (e.target.value > state.product.stock) newValue = state.product.stock;
    setState({
      ...state,
      [e.target.name]: newValue,
    });
  };

  const handleClick = (e) => {
    const button = e.target.innerText;
    const currentQuantity = parseInt(state.quantity);
    if (button === "+" && state.quantity < state.product.stock)
      setState({ ...state, quantity: currentQuantity + 1 });
    else if (button === "-" && state.quantity > 1)
      setState({ ...state, quantity: currentQuantity - 1 });
    else if (button === "Agregar al carrito") {
      // dispatch({ type: ADD_TO_CART, payload: { ...state.product._id } });
      const order = {
        product: state.product._id,
        quantity: state.quantity,
      };

      if(cart.find(item => item.product === state.product._id)){
        const item = cart.find(item => item.product === state.product._id);
        if(item.quantity + state.quantity > state.product.stock){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay suficiente stock',
          })
          return;
        }
      }
      dispatch(addToCart(order));
      Swal.fire({
        icon: "success",
        title: "Producto agregado al carrito",
      });
    }
    else if(button === "Comprar"){
      const order = {
        product: state.product._id,
        quantity: state.quantity,
      };
      history.push(`/comprar?product=${order.product}&quantity=${order.quantity}`);
    }
  };

  const { product, loading } = state;
  const { image, name, price, description, discount, totalPrice, stock } =
    product || {};
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="productpage-container">
          <div className="productpage__image-container">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: image,
                },
                largeImage: {
                  src: image,
                  width: 1200,
                  height: 1800,
                },
                // fadeDurationInMs: 0,
                hoverDelayInMs: 0,
                // hoverOffDelayInMs: 0
              }}
            />
          </div>
          <div className="productpage__info-container">
            <h1 className="productpage__name">{name}</h1>
            <p>Disponible para entrega a partir de mañana</p>
            {discount && (
              <h3 className="productpage__price strike">${price}</h3>
            )}
            <h2 className="productpage__price">${totalPrice}</h2>
            <p className="productpage__description">{description}</p>
            <strong>NO INCLUYE VALOR DEL DOMICILIO</strong>
            <p className="productpage__stock">Unidades disponibles: {stock}</p>
            <div className="productpage__quantities-container">
              <button
                onClick={handleClick}
                type="button"
                className="productpage__quantity-button"
              >
                -
              </button>
              <input
                onKeyDown={(e) => {
                  e.preventDefault();
                  const key = parseInt(e.key);
                  setState((prevState) => ({
                    ...prevState,
                    quantity: key > 0 && key <= stock ? key : state.quantity,
                  }));
                }}
                onChange={handleChange}
                name="quantity"
                className="productpage__quantity-input"
                type="number"
                value={state.quantity}
              />
              <button
                onClick={handleClick}
                type="button"
                className="productpage__quantity-button"
              >
                +
              </button>
            </div>
            <div className="productpage__buttons-container">
              <button onClick={handleClick} type="button" className="productpage__buy-button">
                Comprar
              </button>
              <button onClick={handleClick} type="button" className="productpage__add-cart-button">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPage;
