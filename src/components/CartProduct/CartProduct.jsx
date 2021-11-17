import React from "react";

import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import deleteFromCart from "../../actions/deleteFromCart";

import "./CartProduct.css";

function CartProduct({ product, productInCartIndex }) {
  const dispatch = useDispatch();
  const { name, totalPrice, image, quantity, cardMessage, hasCard } = product;
  console.log(product);
  const handleClick = (e) => {
    Swal.fire({
      icon: "warning",
      title: "Eliminar producto",
      text: "¿Estás seguro de que quieres eliminar este producto del carrito?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteFromCart(productInCartIndex));
        Swal.fire(
          "Eliminado!",
          "El producto ha sido eliminado del carrito.",
          "success"
        );
      }
    });
  };
  console.log(product);
  return (
    <div className="CartProduct-container">
      <div className="CartProduct__image-container">
        <img src={image} alt={name} />
      </div>
      <div className="CartProduct__description-container">
        <h1>Producto: {name}</h1>
        <h2>Cantidad: {quantity}</h2>
        <h2>Precio unitario: {totalPrice}</h2>
        <h2>Total del producto: {totalPrice * quantity}</h2>
        {hasCard && cardMessage && <h2>Mensaje: {cardMessage}</h2>}
      </div>
      <div className="CartProduct__buttons">
        <button onClick={handleClick} className="CartProduct__delete">
          X
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
