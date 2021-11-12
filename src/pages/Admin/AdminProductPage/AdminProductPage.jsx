import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import ReactImageMagnify from "react-image-magnify";

import history from "../../../utils/history";

import "./AdminProductPage.css";
import Swal from "sweetalert2";

function AdminProductPage(props) {
  const [state, setState] = useState({
    product: props.location.product,
    loading: props.location.product ? false : true,
    quantity: 1,
  });

  useEffect(() => {
    if (!props.location.product) {
      async function getProduct() {
        console.log("aqui");
        const id = props.match.params.product;
        const product = await axios.get(`/api/products/getOne/${id}`);
        if (!product.data.stock) {
          history.push("/");
        }
        setState((prevState) => ({
          ...prevState,
          product: product.data,
          loading: false,
        }));
      }
      getProduct();
    } else {
      if (!props.location.product.stock) {
        history.push("/");
      }
    }
  }, [props.location.product, props.match.params.product]);

  console.log(state);
  const handleChange = (e) => {};

  const handleClick = (e) => {};

  const { product, loading } = state;
  const { image, name, price, description, discount, totalPrice, stock } =
    product || {};
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="productpage-container">
          <div className="productpage__image-container">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: product.name,
                  isFluidWidth: true,
                  src: image,
                },
                largeImage: {
                  src: image,
                  width: 1200,
                  height: 1800,
                },
                // fadeDurationInMs: 0,
                hoverDelayInMs: 0,
                // hoverOffDelayInMs: 0
              }}
            />
          </div>
          <div className="productpage__info-container">
            <h1 className="productpage__name">{name}</h1>
            <h2>Descuento: {discount}%</h2>
            {discount && (
              <h2 className="productpage__price">
                Precio original: ${price}
              </h2>
            )}
            <h2 className="productpage__price">
              Precio total: ${totalPrice}
            </h2>
            <p className="productpage__description">
              <strong>Descripción:</strong> "{description}"
            </p>
            <p className="productpage__stock">Unidades disponibles: {stock}</p>
            <div className="productpage__quantities-container"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminProductPage;
