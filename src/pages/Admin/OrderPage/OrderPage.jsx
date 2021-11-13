import axios from "../../../utils/axios";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import Loader from "../../../components/Loader/Loader";
import ProductsCarousel from "../../../components/ProductsCarousel/ProductsCarousel";
import ChangeStatus from "../../../components/Admin/ChangeStatus/ChangeStatus";

import "./OrderPage.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function OrderPage(props) {
  const [state, setState] = useState({
    order: {
      _id: "",
      orderDate: "",
      orderStatus: "",
      clientPhone: "",
      clientEmail: "",
      shippingAddress: "",
      shippingCity: "",
      orderItems: [
        {
          quantity: "",
          productId: {
            _id: "",
            name: "",
            totalPrice: "",
            image: "",
          },
        },
      ],
    },
    loading: true,
    selectedOrderStatus: "",
  });
  const orderId = props.match.params.id;

  async function getOrder() {
    setState({ ...state, loading: true });
    const request = await axios.get(`/api/orders/${orderId}`);
    const orderData = request.data;
    setState({
      ...state,
      order: orderData,
      loading: false,
    });
    console.log(orderData);
  }

  useEffect(() => {
    getOrder();
  }, [orderId]);

  const orderStatus = {
    pending: "Pendiente",
    shipped: "Enviado",
    delivered: "Entregado",
    canceled: "Cancelado",
  };

  const { loading, order } = state;
  const { orderItems } = order;

  const handleClick = (e) => {
    if (orderStatus[order.orderStatus] === e.target.innerText) return;
    console.log(e.target.innerText);
    MySwal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      html: (
        <ChangeStatus
          swal={Swal}
          getOrder={getOrder}
          order={order}
          newStatus={e.target.innerText}
        />
      ),
      showCancelButton: false,
      showConfirmButton: false,
    });
  };

  const products = orderItems.map((item, index) => ({
    ...item.productId,
    quantity: orderItems[index].quantity,
  }));
  console.log(
    `${
      orderStatus[order.orderStatus] === "Cancelado" ||
      orderStatus[order.orderStatus] === "Entregado"
    }`
  );

  const paymentMethods = {
    cash: "Efectivo",
    card: "Tarjeta",
    PSE: "Pago PSE"
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h2>Orden {order._id}</h2>
            <h3>Productos: </h3>
          </div>
          <div className="orderpage-container">
            <div className="orderpage__carousel">
              <ProductsCarousel products={products} details />
            </div>
            <div className="orderpage__data">
              <h3>Datos del cliente: </h3>
              <p>
                <strong>Nombre del que recibe:</strong> {order.clientName}
              </p>
              <p>
                <strong>Correo:</strong> {order.clientEmail}
              </p>
              <p>
                <strong>Teléfono:</strong> {order.clientPhone}
              </p>
              <p>
                <strong>Dirección:</strong> {order.shippingAddress}
              </p>
              <p>
                <strong>Ciudad:</strong> {order.shippingCity}
              </p>
              <p>
                <strong>Método de pago:</strong> {paymentMethods[order.paymentMethod]}
              </p>
              <p>
                <strong>Fecha de entrega:</strong> {format(new Date(order.orderDate), "dd/MM/yyyy")}
              </p>
              <p>
                <strong>Estado de la orden:</strong>{" "}
                {orderStatus[order.orderStatus]}
              </p>
              <div className="orderpage__status-controls">
                <h3>Cambiar estado de la orden</h3>
                <div className="orderpage__status-controls__buttons">
                  <button
                    onClick={handleClick}
                    disabled={
                      orderStatus[order.orderStatus] === "Cancelado" ||
                      orderStatus[order.orderStatus] === "Entregado"
                    }
                    className={`orderpage__status-controls__button pending ${
                      orderStatus[order.orderStatus] === "Pendiente" &&
                      "selected"
                    } ${
                      orderStatus[order.orderStatus] === "Cancelado" &&
                      "disabled"
                    } ${
                      orderStatus[order.orderStatus] === "Entregado" &&
                      "disabled"
                    }`}
                  >
                    Pendiente
                  </button>
                  <button
                    onClick={handleClick}
                    disabled={
                      orderStatus[order.orderStatus] === "Cancelado" ||
                      orderStatus[order.orderStatus] === "Entregado"
                    }
                    className={`orderpage__status-controls__button shipped ${
                      orderStatus[order.orderStatus] === "Enviado" && "selected"
                    } ${
                      orderStatus[order.orderStatus] === "Cancelado" &&
                      "disabled"
                    } ${
                      orderStatus[order.orderStatus] === "Entregado" &&
                      "disabled"
                    }`}
                  >
                    Enviado
                  </button>
                  <button
                    onClick={handleClick}
                    disabled={
                      orderStatus[order.orderStatus] === "Cancelado" ||
                      orderStatus[order.orderStatus] === "Entregado"
                    }
                    className={`orderpage__status-controls__button delivered ${
                      orderStatus[order.orderStatus] === "Entregado" &&
                      "selected"
                    } ${
                      orderStatus[order.orderStatus] === "Cancelado" &&
                      "disabled"
                    }`}
                  >
                    Entregado
                  </button>
                  <button
                    onClick={handleClick}
                    disabled={
                      orderStatus[order.orderStatus] === "Cancelado" ||
                      orderStatus[order.orderStatus] === "Entregado"
                    }
                    className={`orderpage__status-controls__button canceled ${
                      orderStatus[order.orderStatus] === "Cancelado" &&
                      "selected"
                    } ${
                      orderStatus[order.orderStatus] === "Entregado" &&
                      "disabled"
                    }`}
                  >
                    Cancelado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrderPage;
