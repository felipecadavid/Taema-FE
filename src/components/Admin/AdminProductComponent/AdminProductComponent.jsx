import React from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import "./AdminProductComponent.css";

function AdminProductComponent({ product }) {
  const { _id: id, name, image, price, discount, totalPrice, stock } = product;

  return (
    <div className={`${!stock && "productcomponent--outofstock"}`}>
      {discount && (
        <Link to={{ pathname: `/admin/producto/${id}`, product}} className="productcomponent-discount-container">
          <span className="productcomponent__discount">{discount}% OFF</span>
        </Link>
      )}
      <Link to={{ pathname: `/admin/producto/${id}`, product}} className="productcomponent-container">
        <div className="productcomponent__image-container">
          <img className="productcomponent__image" src={image} alt={name} />
        </div>
        <div className="productcomponent__text-container">
          <h3 className="productcomponent__name">{name}</h3>
          <h4 className={`productcomponent__price ${discount && "strike"}`}>
            ${price}
          </h4>
          {discount && (
            <h4 className="productcomponent__price">${totalPrice}</h4>
          )}
          {!stock && <h4 className="productcomponent__outofstock">Agotado</h4>}
        </div>
      </Link>
    </div>
  );
}

export default AdminProductComponent;
