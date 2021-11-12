import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";

import "./AdminCreateProduct.css";

function AdminCreateProduct() {
  const [state, setState] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
    discount: "",
  });

  useEffect(() => {
      
  }, []);

  return (
    <div className="createproduct-container">
      <h1>Nuevo producto</h1>
      <form className="createproduct__form">
        <div className="createproduct__form__input-container">
          <label htmlFor="category">Categoria</label>
          <select name="" id="category"></select>
        </div>
        <div className="createproduct__form__input-container">
          <label htmlFor="name">Nombre del producto</label>
          <input type="text" id="name" className="createproduct__form__input" />
        </div>
        <div className="createproduct__form__input-container">
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            id="image"
            className="createproduct__form__input"
          />
        </div>
        <div className="createproduct__form__input-container">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            className="createproduct__form__input"
          />
        </div>
        <div className="createproduct__form__input-container">
          <label htmlFor="discount">Descuento</label>
          <input
            type="number"
            id="discount"
            defaultValue={0}
            className="createproduct__form__input"
          />
        </div>
        <div className="createproduct__form__input-container">
          <label htmlFor="stock">Unidades disponibles</label>
          <input
            type="number"
            id="stock"
            className="createproduct__form__input"
          />
        </div>
      </form>
    </div>
  );
}

export default AdminCreateProduct;
