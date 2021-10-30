import React from "react";

import ProductComponent from "../ProductComponent/ProductComponent";

import "./ProductList.css";

function ProductList({ products }) {
  return (
    <div className="productlist-margin">
      <div className="productlist-container">
        {products.map((product) => (
          <>
            <ProductComponent product={product} />
          </>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
