import React from "react";

import "./ProductComponent.css";

function ProductComponent({ product }) {
  function getDiscountedPrice() {
    const { price, discount } = product;
    return price - (price * discount) / 100;
  }

  const { name, image, price, discount } = product;
  return (
    <div>
      {discount && (
        <div className="productcomponent-discount-container">
          <span className="productcomponent__discount">{discount}% OFF</span>
        </div>
      )}
      <div className="productcomponent-container">
        <div className="productcomponent__image-container">
          <img className="productcomponent__image" src={image} alt={name} />
        </div>
        <div className="productcomponent__text-container">
          <h3 className="productcomponent__name">{name}</h3>
          <h4 className={`productcomponent__price ${discount && "strike"}`}>
            ${price}
          </h4>
          {discount && (
            <h4 className="productcomponent__price">${getDiscountedPrice()}</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductComponent;
