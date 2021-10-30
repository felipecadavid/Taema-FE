import {
  faFacebookSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/Logo.png";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo" src={Logo} alt="Logo" />
      <div className="footer__section">
        <h3 className="footer__h3">Información General</h3>
        <ul className="footer__ul">
          <li className="footer__li">
            <Link to="/">Guía de compra</Link>
          </li>
          <li className="footer__li">
            <Link to="/">Catálogo</Link>
          </li>
          <li className="footer__li">
            <Link to="/">Medios de pago</Link>
          </li>
          <li className="footer__li">
            <Link to="/">Preguntas frecuentes</Link>
          </li>
        </ul>
      </div>
      <div className="footer__section">
        <h3 className="footer__h3">Contáctanos</h3>
        <ul className="footer__ul">
          <li className="footer__li">
            <Link to="/">WhatsApp: +573022543198</Link>
          </li>
        </ul>
      </div>
      <div className="footer__section">
        <h3 className="footer__h3">Cuenta</h3>
        <ul className="footer__ul">
          <li className="footer__li">
            <Link to="/">Información personal</Link>
          </li>
          <li className="footer__li">
            <Link to="/">Pedidos</Link>
          </li>
          <li className="footer__li">
            <Link to="/">Direcciones</Link>
          </li>
        </ul>
      </div>
      <div className="footer__section">
        <h3 className="footer__h3">Redes</h3>
        <ul className="footer__social-ul">
          <li className="footer__li">
            <FontAwesomeIcon icon={faInstagramSquare} />
          </li>
          <li className="footer__li">
            <FontAwesomeIcon icon={faFacebookSquare} />
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
