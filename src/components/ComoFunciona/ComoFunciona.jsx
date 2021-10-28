import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faEnvelope, faComments } from "@fortawesome/free-solid-svg-icons";

import './ComoFunciona.css';

function ComoFunciona() {
  return (
    <section className="comofunciona">
      <h2 className="comofunciona__title">¿Cómo funciona?</h2>
      <div className="comofunciona__container">
        <div className="comofunciona__container__item">
          <FontAwesomeIcon icon={faCartArrowDown} />
          <h3 className="comofunciona__container__item__title">
            Selecciona tu regalo
          </h3>
          <p className="comofunciona__container__item__text">
            Dale al producto que quieras comprar o agregar al carrito. Agrega la adición que desees para un regalo especial.
          </p>
        </div>
        <div className="comofunciona__container__item">
          <FontAwesomeIcon icon={faEnvelope} />

          <h3 className="comofunciona__container__item__title">
            Inspírate en tu mensaje
          </h3>
          <p className="comofunciona__container__item__text">
            Escribe un bonito mensaje para esa persona especial.
          </p>
        </div>
        <div className="comofunciona__container__item">
          <FontAwesomeIcon icon={faComments} />

          <h3 className="comofunciona__container__item__title">
            La persona recibirá el regalo a domicilio
          </h3>
          <p className="comofunciona__container__item__text">
            La persona quedará sorprendida con el regalo que llega a su casa.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ComoFunciona;
