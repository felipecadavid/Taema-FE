import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";

import './AdminOrders.css'

import Loader from "../../Loader/Loader";
import history from "../../../utils/history";

function AdminOrders(props) {
  const [state, setState] = useState({
    orders: [],
    loading: true,
  });

  useEffect(() => {
    async function getOrders() {
      try{
      const response = await axios.get("/api/orders");
      setState({ ...state, orders: response.data, loading: false });
      } catch(err) {
        localStorage.removeItem("token");
        history.push("/");
      }
    } 
    getOrders();
  }, []);

  const orderStatus = {
    pending: "Pendiente",
    shipped: "Enviado",
    delivered: "Entregado",
    canceled: "Cancelado",
  };

  return (
    <div className="orders-container">
      {state.loading ? (
        <Loader />
      ) : (
        <>
          {state.orders.map((order) => (
            <div onClick={() => history.push(`/admin/order/${order._id}`)} className="order-container" key={order._id}>
              <div>
                <h3>Numero de orden: {order.orderNumber}</h3>
              </div>
              <p>Cliente: {order.clientEmail}</p>
              <p>Estado: {orderStatus[order.orderStatus]}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default AdminOrders;
