import React, { useState } from "react";
import Swal from "sweetalert2";

import "./PayComponent.css";

import axios from "../../utils/axios";
import Loader from "../Loader/Loader";

function PayComponent({ createOrder, totalToPay }) {
  const [state, setState] = useState({
    phase: 0,
    loading: false,
    cardData: {
      "card[number]": null,
      "card[exp_year]": null,
      "card[exp_month]": null,
      "card[cvc]": null,
    },

    customerData: {
      token_card: null,
      name: null,
      last_name: null,
      email: null,
      doc_type: "CC",
      doc_number: null,
      city: null,
      address: null,
      phone: null,
      cell_phone: null,
      default: true,
    },
    chargeData: {
      token_card: null,
      customer_id: null,
      doc_type: "CC",
      doc_number: null,
      name: null,
      last_name: null,
      email: null,
      city: null,
      address: null,
      phone: null,
      cell_phone: null,
      bill: "OR-1234",
      description: "Pago en linea en Taema Detalles",
      value: totalToPay,
      tax: 0,
      tax_base: 0,
      currency: "COP",
      dues: 1,
      ip: "190.000.000.000",
      url_response: "https://ejemplo.com/respuesta.html",
      url_confirmation: "https://ejemplo.com/confirmacion",
      method_confirmation: "GET",
    },
    cardToken: null,
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const { phase, cardData, customerData } = state;
    const cardValues = Object.values(cardData);
    const customerValues = Object.values(customerData);
    if (
      phase === 0 &&
      cardValues[0] &&
      cardValues[1] &&
      cardValues[2] &&
      cardValues[3]
    ) {
      await sendCardData();
    } else if (phase === 1 && !customerValues.includes(null)) {
      const data = await sendCustomerDataAndCharge();
      const status = data.data.charge.success;
      if (status) {
        setState({
          ...state,
          loading: false,
        });
        createOrder();
      } else {
        console.log(data);
        setState({
          ...state,
          loading: false,
        });
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal con el pago, por favor intenta de nuevo",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (phase === 0) {
      setState({
        ...state,
        cardData: {
          ...state.cardData,
          [name]: value,
        },
      });
    } else if (phase === 1) {
      setState({
        ...state,
        customerData: {
          ...state.customerData,
          [name]: value,
        },
      });
    }
  };

  const sendCardData = async () => {
    const { cardData } = state;
    setState({
      ...state,
      loading: true,
    });
    const data = await axios.post("/api/payments/create-card", cardData);

    if (!data.data.token.success) {
      setState({ ...state, loading: false });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal con la tarjeta, por favor intenta de nuevo",
      });
    } else {
      setState({
        ...state,
        phase: 1,
        customerData: {
          ...state.customerData,
          token_card: data.data.token.id,
        },
        loading: false,
      });
    }
  };

  const sendCustomerDataAndCharge = async () => {
    const { customerData } = state;
    setState({
      ...state,
      loading: true,
    });
    const data = await axios.post(
      "/api/payments/create-customer",
      customerData
    );
    console.log("customer data: ", data);
    const customerId = data.data.customer.data.customerId;
    console.log("customerid: ", customerId);
    const {
      token_card,
      name,
      last_name,
      email,
      doc_type,
      doc_number,
      city,
      address,
      phone,
      cell_phone,
    } = customerData;
    const chargeData = {
      token_card,
      customer_id: customerId,
      doc_type,
      doc_number,
      name,
      last_name,
      email,
      city,
      address,
      phone,
      cell_phone,
      bill: "OR-1234",
      description: "Pago en linea de producto en Taema Detalles",
      value: totalToPay,
      tax: 0,
      tax_base: 0,
      currency: "COP",
      dues: 1,
      ip: "190.000.000.000",
      url_response: "https://ejemplo.com/respuesta.html",
      url_confirmation: "https://ejemplo.com/confirmacion",
      method_confirmation: "GET",
    };
    console.log(chargeData);
    const chargeDataResponse = await axios.post(
      "/api/payments/charge",
      chargeData
    );
    return chargeDataResponse;
  };

  const { phase, loading } = state;
  return (
    <>
      {!loading ? (
        <>
          {phase === 0 ? (
            <form className="epayco-form">
              <div className="epayco-form__input-container">
                <label className="epayco-form__label" htmlFor="number">
                  Número de tarjeta
                </label>
                <input
                  className="type-inputfield"
                  onChange={handleChange}
                  name="card[number]"
                  id="number"
                  type="number"
                />
              </div>
              <div className="epayco-form__input-container exp-date">
                <div>
                  <label h className="epayco-form__label" htmlFor="exp_year">
                    Año de expiración
                  </label>
                  <input
                    style={{ width: "93%" }}
                    className="type-inputfield"
                    onChange={handleChange}
                    name="card[exp_year]"
                    id="exp_year"
                    type="number"
                  />
                </div>
                <div>
                  <label className="epayco-form__label" htmlFor="exp_month">
                    Mes de expiración
                  </label>
                  <input
                    style={{width: "93%"}}
                    className="type-inputfield"
                    onChange={handleChange}
                    name="card[exp_month]"
                    id="exp_month"
                    type="number"
                  />
                </div>
              </div>
              <div className="epayco-form__input-container">
                <label className="epayco-form__label" htmlFor="cvc">
                  CVC
                </label>
                <input
                  className="type-inputfield"
                  onChange={handleChange}
                  name="card[cvc]"
                  id="cvc"
                  type="number"
                />
              </div>
              <input
                className="epayco-form__submit"
                onClick={handleClick}
                type="submit"
                value="Continuar"
              />
            </form>
          ) : (
            phase === 1 && (
              <form className="epayco-form">
                <div className="epayco-form__input-container">
                  <label className="epayco-form__label" htmlFor="name">
                    Nombre
                  </label>
                  <input
                    className="type-inputfield"
                    onChange={handleChange}
                    defaultValue=""
                    id="name"
                    name="name"
                    type="text"
                  />
                </div>
                <div className="epayco-form__input-container">
                  <label className="epayco-form__label" htmlFor="last_name">
                    Apellido
                  </label>
                  <input
                    className="type-inputfield"
                    onChange={handleChange}
                    defaultValue=""
                    id="last_name"
                    name="last_name"
                    type="text"
                  />
                </div>
                <div className="epayco-form__input-container">
                  <label className="epayco-form__label" htmlFor="email">
                    Correo electrónico
                  </label>
                  <input
                    className="type-inputfield"
                    onChange={handleChange}
                    defaultValue=""
                    id="email"
                    name="email"
                    type="email"
                  />
                </div>
                <div className="epayco-form__input-container">
                  <label className="epayco-form__label" htmlFor="doc_type">
                    Tipo de documento
                  </label>
                  <select
                    className="type-inputfield"
                    onChange={handleChange}
                    name="doc_type"
                    id="doc_type"
                  >
                    <option value="CC">CC</option>
                    <option value="CE">CE</option>
                  </select>
                </div>
                <div className="epayco-form__input-container">
                  <label className="epayco-form__label" htmlFor="doc_number">
                    Número de documento
                  </label>
                  <input
                    className="type-inputfield"
                    onChange={handleChange}
                    id="doc_number"
                    name="doc_number"
                    type="number"
                  />
                </div>
                <div className="epayco-form__input-container">
                  <label className="epayco-form__label" htmlFor="city">
                    Ciudad
                  </label>
                  <input
                    className="type-inputfield"
                    onChange={handleChange}
                    id="city"
                    name="city"
                    type="text"
                  />
                </div>
                <div className="epayco-form__input-container">
                  <label className="epayco-form__label" htmlFor="address">
                    Dirección
                  </label>
                  <input
                    className="type-inputfield"
                    onChange={handleChange}
                    id="address"
                    name="address"
                    type="text"
                  />
                </div>
                <div className="epayco-form__input-container">
                  <label className="epayco-form__label" htmlFor="phone">
                    Teléfono
                  </label>
                  <input
                    className="type-inputfield"
                    onChange={handleChange}
                    id="phone"
                    name="phone"
                    type="number"
                  />
                </div>
                <div className="epayco-form__input-container">
                  <label className="epayco-form__label" htmlFor="cell_phone">
                    Teléfono celular
                  </label>
                  <input
                    className="type-inputfield"
                    onChange={handleChange}
                    id="cell_phone"
                    name="cell_phone"
                    type="number"
                  />
                </div>
                <input
                  className="epayco-form__submit"
                  onClick={handleClick}
                  type="submit"
                  value="Pagar"
                />
              </form>
            )
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default PayComponent;
