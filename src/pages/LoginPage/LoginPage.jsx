import React, { useState } from "react";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import setToken from "../../actions/setToken";

import "./LoginPage.css";

function LoginPage() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    error: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState({
      ...state,
      [id]: value,
    });
  };

  const validateInputs = () => {
    if (state.email.length === 0 || state.password.length === 0) {
      setState({
        ...state,
        error: true,
      });
      return false;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        state.email
      )
    ) {
      setState({
        ...state,
        error: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      axios
        .get(`/api/users/login?email=${state.email}&password=${state.password}`)
        .then((res) => {
          const { token } = res.data;
          const { _doc: userData } = res.data;
          const data = { token, userData };
          dispatch(setToken(data));
        })
        .catch(() => {
          setState({
            ...state,
            error: true,
          });
        });
    }
  };

  const { error } = state;
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login__form">
        <h2 className="login__title">Taema Detalles</h2>
        <div className="login__form__input-container">
          <label htmlFor="email">Correo</label>
          <input onChange={handleChange} type="text" id="email" />
        </div>
        <div className="login__form__input-container">
          <label htmlFor="password">Contraseña</label>
          <input onChange={handleChange} type="password" id="password" />
        </div>
        {error && (
          <span className="login__form__error">
            Credenciales erróneas, por favor inténtalo nuevamente
          </span>
        )}
        <input className="login__form__submit" type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default LoginPage;
