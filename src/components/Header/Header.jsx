import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faShoppingCart,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

import Logo from "../../assets/logo/Logo.png";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";

function Header() {
  const cart = useSelector((state) => state.cart);
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="Logo" />
      </Link>
      <div className="header__options">
        <div className="header__social">
          <Link to="/">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
        </div>
        <div className="header__navigate">
          <ul className="header__navigate__links">
            <li>
              <Link to="/">Preguntas Frecuentes</Link>
            </li>
            {/* <li> */}
              {/* <Link to="/">Ingresar</Link> */}
            {/* </li> */}
            {/* <li> */}
              {/* <Link to="/">Registrarse</Link> */}
            {/* </li> */}
          </ul>
          <input className="header__navigate__input" type="text" placeholder="Busca lo que deseas" />
        </div>
        <div className="header__mobile-buttons-container">
          <Link
            to="/carrito"
            className="mobile-butons-container__shopping-cart-container"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>{cart.length || 0}</span>
          </Link>
          <FontAwesomeIcon
            className="mobile-buttons__menu-button"
            onClick={toggleMenu}
            icon={faBars}
          />
        </div>
      </div>
      <div
          className={`header__collapsable-menu ${menu ? "shown" : "hidden"}`}
        >
          <FontAwesomeIcon
            className="collapsable-menu__close-menu-button"
            onClick={toggleMenu}
            icon={faTimes}
          />
          <div className="collapsable-menu__main-container">
            <ul className="collapsable-menu__navigate__links">
              
              <li>
                <Link to="/">Ingresar</Link>
              </li>
              <li>
                <Link to="/">Registrarse</Link>
              </li>
            </ul>
            <ul className="collapsable-menu__navigate__links">
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                <Link to="/">Preguntas Frecuentes</Link>
              </li>
                    <li>
                        <Link to="/">Cómo comprar</Link>
                    </li>
                    <li>
                        <Link to="/">Escríbenos por WhatsApp</Link>
                    </li>
                    <li>
                        <Link to="/">Catálogo</Link>
                    </li>
                    <li>
                        <Link to="/">Agendas</Link>
                    </li>
                </ul>
          </div>
        </div>
    </header>
  );
}

export default Header;
