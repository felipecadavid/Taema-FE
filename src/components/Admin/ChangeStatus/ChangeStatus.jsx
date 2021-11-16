import React, { useState } from "react";
import axios from "../../../utils/axios";

import "./ChangeStatus.css";

function ChangeStatus({ getOrder, swal, order, newStatus }) {
  console.log(order);
  const [message, setMessage] = useState("");

  const orderStatus = {
    Pendiente: "pending",
    Enviado: "shipped",
    Entregado: "delivered",
    Cancelado: "canceled",
  };
  const changeOrderStatus = async () => {
    const response = await axios.put(`/api/orders/${order._id}`, {
      status: orderStatus[newStatus],
      message,
    });
    console.log(response);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = async (e) => {
    if (e.target.innerText === "Cancelar") {
      swal.close();
      return;
    }

    if (e.target.innerText === "Confirmar") {
      console.log("click");
      await changeOrderStatus();
      swal.close();
      getOrder();
    }
  };

  return (
    <div className="chanestatus-container">
      <h2>
        Estás seguro de que deseas cambiar el estado de la orden a {newStatus}
      </h2>
      {newStatus === "Cancelado" && (
        <>
          <h3>Si cambias el estado a cancelado no podrás revertirlo después</h3>
          <h4>Puedes adjuntar el motivo de la cancelación</h4>
          <textarea
            onChange={handleChange}
            className="changestatus__textarea"
            placeholder="Motivo de la cancelación"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </>
      )}
      <div className="changestatus__buttons-container">
        <button onClick={handleClick}>Confirmar</button>
        <button onClick={handleClick}>Cancelar</button>
      </div>
    </div>
  );
}

export default ChangeStatus;
