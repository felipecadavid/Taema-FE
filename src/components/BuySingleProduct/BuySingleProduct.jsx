import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
import axios from "../../utils/axios";
import history from "../../utils/history";
import PayComponent from "../PayComponent/PayComponent";
import ProductsCarousel from "../ProductsCarousel/ProductsCarousel";

import "./BuySingleProduct.css";

function BuySingleProduct(props) {
  const { product, quantity } = props;
  const { totalPrice } = product;
  const totalToPay = totalPrice * quantity;

  const [state, setState] = useState({
    orderDate: {
      value: null,
      error: false,
    },
    clientEmail: null,
    clientPhone: null,
    shippingCity: null,
    shippingAddress: null,
    paymentMethod: null,
    isPaying: false
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
    if (
      !(
        state.clientPhone &&
        state.shippingCity &&
        state.shippingAddress &&
        state.paymentMethod
      )
    ) {
      Swal.fire({
        title: "Error",
        text: "Por favor completa todos los campos",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const {
      paymentMethod
    } = state;

    if (paymentMethod === "cash") {
      createOrder();
    } else if (paymentMethod === "card") {
      setState({ ...state, isPaying: true });
    } else if (paymentMethod === "PSE") {
      Swal.fire({
        title: "Error",
        text: "Método de pago no disponible",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

  };

  const handleChange = (e) => {
    if (e.target.name !== "paymentMethod") {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.id,
      });
    }

    console.log(state);
  };

  const createOrder = () => {
    const {
      orderDate,
      clientEmail,
      clientPhone,
      shippingCity,
      shippingAddress,
      paymentMethod,
    } = state;
    const productId = product._id;

    const order = {
      orderItems: [{ productId, quantity }],
      orderDate: orderDate.value,
      clientEmail: clientEmail,
      clientPhone: clientPhone,
      shippingCity: shippingCity,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
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

  const { name, image } = product;
  return (
    <>
    
    <div className="single-container">
      <h1 className="single__title">Vas a comprar...</h1>
      <div className="single__carousel-container">
        <ProductsCarousel
          products={[].concat({ ...product, quantity })}
          details
        />
      </div>
      {state.isPaying && <PayComponent product={product} totalToPay={totalToPay} createOrder={createOrder} />}
      {!state.isPaying &&
      <form className="single__form-container" onSubmit={handleSubmit}>
        <h1>
          Por favor proporcionanos los siguientes datos para poder realizar la
          compra
        </h1>
        <label className="single__purchase-label">
          Selecciona una fecha de envío*
        </label>
        <Calendar onChange={handleDateChange} />
        {state.orderDate.error && (
          <span className="single__purchase-error-span">
            La fecha de entrega debe ser a partir de mañana
          </span>
        )}
        <div className="single__purchase__input-container">
          <label className="single__purchase-label" htmlFor="email">
            Correo electrónico*
          </label>
          <input
            onChange={handleChange}
            className="single__purchase-input"
            id="email"
            type="email"
            placeholder="Ej. usuario@gmail.com"
            name="clientEmail"
          />
        </div>
        <div className="single__purchase__input-container">
          <label className="single__purchase-label" htmlFor="phoneNumber">
            Número de teléfono celular*
          </label>
          <input
            className="single__purchase-input"
            id="phoneNumber"
            type="tel"
            placeholder="Ej. 302123456"
            name="clientPhone"
            onChange={handleChange}
          />
        </div>
        <div className="single__purchase__input-container">
          <label className="single__purchase-label" htmlFor="city">
            Ciudad destino*
          </label>
          <input
            className="single__purchase-input"
            id="city"
            type="text"
            placeholder="Ej. Medellín"
            name="shippingCity"
            onChange={handleChange}
          />
        </div>
        <div className="single__purchase__input-container">
          <label className="single__purchase-label" htmlFor="address">
            Dirección*
          </label>
          <input
            className="single__purchase-input"
            id="address"
            type="text"
            placeholder="Ej. Cl 40 #123b - 45"
            name="shippingAddress"
            onChange={handleChange}
          />
        </div>
        <div className="single__purchase__method-container">
          <label className="single__purchase-label" htmlFor="method">
            Método de pago*
          </label>
          <div className="single__purchase-input--radio-container">
            <input
              onChange={handleChange}
              className="single__purchase-input--radio"
              type="radio"
              name="paymentMethod"
              id="cash"
            />
            <label htmlFor="cash">Efectivo contra-entrega</label>
          </div>
          <div className="single__purchase-input--radio-container">
            <input
              onChange={handleChange}
              className="single__purchase-input--radio"
              type="radio"
              name="paymentMethod"
              id="card"
            />
            <label htmlFor="card">Pago en línea con Tarjeta</label>
          </div>
          <div className="single__purchase-input--radio-container">
            <input
              onChange={handleChange}
              className="single__purchase-input--radio"
              type="radio"
              name="paymentMethod"
              id="PSE"
            />
            <label htmlFor="PSE">Pago PSE</label>
          </div>
        </div>
        <h2>Total a pagar: ${totalToPay}</h2>
        <button className="single__purchase__submit" type="submit">
          Continuar
        </button>
      </form>}
    </div>
    </>
  );
}

export default BuySingleProduct;
