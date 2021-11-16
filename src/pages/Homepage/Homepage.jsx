import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import './Homepage.css';

import CategoryList from "../../components/CategoryList/CategoryList";
import ComoFunciona from "../../components/ComoFunciona/ComoFunciona";

function Homepage() {
  return (
    <>
      <CategoryList />
      <ComoFunciona />
      <div className="whatsapp-button-container">
        <a
          className="whatsapp-button"
          href="https://api.whatsapp.com/send?phone=573022543198&text=Hola, me gustaría obtener más información sobre sus productos"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
    </>
  );
}

export default Homepage;
