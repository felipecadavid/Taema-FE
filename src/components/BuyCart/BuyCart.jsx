import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "../../utils/axios";
import history from "../../utils/history";

import deleteFullCart from "../../actions/deleteFullCart";

import ProductsCarousel from "../ProductsCarousel/ProductsCarousel";

import "./BuyCart.css";
import PayComponent from "../PayComponent/PayComponent";

function BuyCart(props) {
  const dispatch = useDispatch();
  const { products } = props;
  function getTotalToPay() {
    const total = products.reduce((acc, product) => {
      return acc + product.totalPrice * product.quantity;
    }, 0);
    return total;
  }
  const totalToPay = getTotalToPay();
  const [state, setState] = useState({
    orderDate: {
      value: null,
      error: false,
    },
    clientEmail: null,
    clientPhone: null,
    shippingCity: null,
    shippingAddress: null,
    isPaying: false,
  });
  const currentDate = new Date();
  const handleDateChange = (value, e) => {
    if (value <= currentDate) {
      setState({
        ...state,
        orderDate: {
          value,
          error: true,
        },
      });
      return;
    } else {
      setState({
        ...state,
        orderDate: {
          value,
          error: false,
        },
      });
    }
  };


  const createOrder = () => {
    const {
      orderDate,
      clientEmail,
      clientPhone,
      shippingCity,
      shippingAddress,
    } = state;

    const productsToSend = products.map((product) => {
      return {
        productId: product._id,
        quantity: product.quantity,
      };
    });
    const order = {
      orderItems: productsToSend,
      orderDate: orderDate.value,
      clientEmail: clientEmail,
      clientPhone: clientPhone,
      shippingCity: shippingCity,
      shippingAddress: shippingAddress,
    };
    setState({ ...state, loading: true });
    console.log(order);
    axios
      .post("/api/orders", order)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Exito",
          text: "Tu pedido ha sido realizado con éxito",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          console.log("DISPATCH");
          dispatch(deleteFullCart());
          history.push("/");
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error, por favor intenta de nuevo",
        });
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.orderDate.error) {
      Swal.fire({
        title: "Error",
        text: "Por favor selecciona una fecha válida, la fecha debe ser posterior a hoy",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(state.clientEmail)) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa un correo válido",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (!(state.clientPhone && state.shippingCity && state.shippingAddress)) {
      Swal.fire({
        title: "Error",
        text: "Por favor completa todos los campos",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    setState({ ...state, isPaying: true });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="cart-container">
      <h1 className="cart__title">Vas a comprar...</h1>
      <div className="cart__carousel-container">
        <ProductsCarousel products={products} details />
      </div>
      {state.isPaying && (
        <PayComponent totalToPay={totalToPay} createOrder={createOrder} />
      )}
      {!state.isPaying && (
        <form className="cart__form-container" onSubmit={handleSubmit}>
          <h1>
            Por favor proporcionanos los siguientes datos para poder realizar la
            compra
          </h1>
          <label className="cart__purchase-label">
            Selecciona una fecha de envío*
          </label>
          <Calendar onChange={handleDateChange} />
          {state.orderDate.error && (
            <span className="cart__purchase-error-span">
              La fecha de entrega debe ser a partir de mañana
            </span>
          )}
          <div className="cart__purchase__input-container">
            <label className="cart__purchase-label" htmlFor="email">
              Correo electrónico*
            </label>
            <input
              onChange={handleChange}
              className="cart__purchase-input"
              id="email"
              type="email"
              placeholder="Ej. usuario@gmail.com"
              name="clientEmail"
            />
          </div>
          <div className="cart__purchase__input-container">
            <label className="cart__purchase-label" htmlFor="phoneNumber">
              Número de teléfono celular*
            </label>
            <input
              className="cart__purchase-input"
              id="phoneNumber"
              type="tel"
              placeholder="Ej. 302123456"
              name="clientPhone"
              onChange={handleChange}
            />
          </div>
          <div className="cart__purchase__input-container">
            <label className="cart__purchase-label" htmlFor="city">
              Ciudad destino*
            </label>
            <input
              className="cart__purchase-input"
              id="city"
              type="text"
              placeholder="Ej. Medellín"
              name="shippingCity"
              onChange={handleChange}
            />
          </div>
          <div className="cart__purchase__input-container">
            <label className="cart__purchase-label" htmlFor="address">
              Dirección*
            </label>
            <input
              className="cart__purchase-input"
              id="address"
              type="text"
              placeholder="Ej. Cl 40 #123b - 45"
              name="shippingAddress"
              onChange={handleChange}
            />
          </div>
          <div className="cart__purchase__method-container">
            <label className="cart__purchase-label" htmlFor="method">
              Método de pago*
            </label>
            <div className="cart__purchase-input--radio-container">
              <input
                onChange={handleChange}
                className="cart__purchase-input--radio"
                type="radio"
                name="paymentMethod"
                id="cash"
              />
              <label htmlFor="cash">Efectivo contra-entrega</label>
            </div>
            <div className="cart__purchase-input--radio-container">
              <input
                onChange={handleChange}
                className="cart__purchase-input--radio"
                type="radio"
                name="paymentMethod"
                id="card"
              />
              <label htmlFor="card">Pago en línea con Tarjeta</label>
            </div>
            <div className="cart__purchase-input--radio-container">
              <input
                onChange={handleChange}
                className="cart__purchase-input--radio"
                type="radio"
                name="paymentMethod"
                id="PSE"
              />
              <label htmlFor="PSE">Pago PSE</label>
            </div>
          </div>
          <button className="cart__purchase__submit" type="submit">
            Continuar
          </button>
          <h2>Total a pagar: ${totalToPay}</h2>
        </form>
      )}
    </div>
  );
}

export default BuyCart;
