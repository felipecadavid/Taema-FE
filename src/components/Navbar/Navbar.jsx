import React from "react";
import { Link } from "react-router-dom";
import history from "../../utils/history";

import "./Navbar.css";

function Navbar() {
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      history.push(`/search?q=${e.target.value}`);
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar__mobile">
        <input className="type-inputfield" onKeyDown={handleSearch} type="search" placeholder="Buscar" />
      </div>
      <div className="navbar__desktop">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/">Cómo comprar</Link>
          </li>
          <li>
            <Link to="/">Escríbenos por WhatsApp</Link>
          </li>
          <li>
            <Link to="/categorias">Catálogo</Link>
          </li>
          <li>
            <Link to="/">Agendas</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
