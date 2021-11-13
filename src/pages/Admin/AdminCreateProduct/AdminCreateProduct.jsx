import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import history from "../../../utils/history";

import Loader from "../../../components/Loader/Loader";
import ProductComponent from "../../../components/ProductComponent/ProductComponent";

import "./AdminCreateProduct.css";
import Swal from "sweetalert2";

function AdminCreateProduct() {
  const [state, setState] = useState({
    categories: [],
    formData: {
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      stock: "",
      discount: "",
      totalPrice: "",
    },
    loading: true,
    previewImage: "",
  });

  useEffect(() => {
    async function getCategories() {
      const { data } = await axios.get("/api/categories");
      setState({ ...state, categories: data, loading: false });
    }
    getCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "discount") {
      const { price } = state.formData;
      const discount = e.target.value;
      const totalPrice = price - (price * discount) / 100;
      setState({
        ...state,
        formData: {
          ...state.formData,
          [e.target.id]: e.target.value,
          totalPrice,
        },
      });
      return;
    }
    const { id, value } = e.target;
    setState({ ...state, formData: { ...state.formData, [id]: value } });
  };

  const handleUpload = (e) => {
    const { files } = e.target;
    const formData = new FormData();
    formData.append("image", files[0]);
    setState({
      ...state,
      formData: { ...state.formData, image: formData },
      previewImage: URL.createObjectURL(files[0]),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    try{
      const {data: image} = await axios.post("/api/products/image", state.formData.image);
      const formData = { ...state.formData, image: image };
      await axios.post("/api/products", formData);
      setState({ ...state, loading: false });
      Swal.fire({
        title: "Producto creado",
        text: "Producto creado exitosamente!",
        icon: "success",
      }).then(() => {
        history.push("/admin");
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error inesperado :c",
      });
      console.log(error);
    }
  };

  const mockImage =
    "https://store-images.s-microsoft.com/image/apps.38282.13733306562729316.049f2fd1-b066-4cb5-b5ef-317d282a0b02.ca5b4cd1-6cda-4b13-80af-d7d8e5ba2256?w=162&h=162&q=90&mode=crop";
  return (
    <>
      {state.loading ? (
        <Loader />
      ) : (
        <div className="createproduct-container">
          <div className="createproduct__preview">
            <ProductComponent
              disabled
              onClick={(e) => e.preventDefault()}
              product={{
                ...state.formData,
                stock: 1,
                image: state.previewImage || mockImage,
              }}
            />
          </div>
          <form onSubmit={handleSubmit} className="createproduct__form">
            <h1>Nuevo producto</h1>

            <div className="createproduct__form__input-container">
              <label className="createproduct__form__label" htmlFor="category">Categoria</label>
              <select
                onChange={handleChange}
                defaultValue="default"
                name=""
                id="category"
                className="createproduct__form__input"
              >
                <option value="default" disabled hidden>
                  Elige una categoría
                </option>
                {state.categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="createproduct__form__input-container">
              <label className="createproduct__form__label" htmlFor="name">Nombre del producto</label>
              <input
                onChange={handleChange}
                type="text"
                id="name"
                className="createproduct__form__input"
              />
            </div>
            <div className="createproduct__form__input-container">
              <label className="createproduct__form__label" htmlFor="image">Imagen</label>
              <label className="createproduct__form__input__file-button type-button" htmlFor="image">
                  Subir imágen
              </label>
              <input
                onChange={handleUpload}
                type="file"
                id="image"
                className="createproduct__form__input file"
                accept="image/*"
              />
            </div>
            <div className="createproduct__form__input-container">
              <label className="createproduct__form__label" htmlFor="price">Precio</label>
              <input
                onChange={handleChange}
                type="number"
                id="price"
                className="createproduct__form__input"
              />
            </div>
            <div className="createproduct__form__input-container">
              <label className="createproduct__form__label" htmlFor="discount">Descuento</label>
              <input
                onChange={handleChange}
                type="number"
                id="discount"
                defaultValue={0}
                className="createproduct__form__input"
              />
            </div>
            <div className="createproduct__form__input-container">
              <label className="createproduct__form__label" htmlFor="stock">Unidades disponibles</label>
              <input
                onChange={handleChange}
                type="number"
                id="stock"
                className="createproduct__form__input"
              />
            </div>
            <div className="createproduct__form__input-container">
              <label className="createproduct__form__label" htmlFor="description">Descripción</label>
              <textarea
                onChange={handleChange}
                className="createproduct__form__input--textarea"
                id="description"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <input className="type-button" type="submit" value="Crear" />
          </form>
        </div>
      )}
    </>
  );
}

export default AdminCreateProduct;
