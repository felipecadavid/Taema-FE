import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import ReactImageMagnify from "react-image-magnify";

import history from "../../../utils/history";

import "./AdminProductPage.css";
import Loader from "../../../components/Loader/Loader";
import ProductComponent from "../../../components/ProductComponent/ProductComponent";
import Swal from "sweetalert2";

function AdminProductPage(props) {
  const [state, setState] = useState({
    product: props.location.product || {},
    loading: props.location.product ? false : true,
    quantity: 1,
    formData: {
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      stock: "",
      discount: "",
      totalPrice: "",
      hasCard: false,
    },
    loading: true,
    previewImage: "",
  });

  useEffect(() => {
    if (!props.location.product) {
      async function getProduct() {
        const id = props.match.params.product;
        const product = await axios.get(`/api/products/getOne/${id}`);
        setState((prevState) => ({
          ...prevState,
          product: product.data,
          loading: false,
          formData: {
            id: product.data._id,
            name: product.data.name,
            price: product.data.price,
            description: product.data.description,
            category: product.data.category,
            stock: product.data.stock,
            discount: product.data.discount,
            totalPrice: product.data.totalPrice,
          },
          previewImage: product.data.image,
        }));
      }
      getProduct();
    } else {
      setState((prevState) => ({
        ...prevState,
        product: props.location.product,
        loading: false,
        formData: {
          id: props.location.product._id,
          name: props.location.product.name,
          price: props.location.product.price,
          description: props.location.product.description,
          category: props.location.product.category,
          stock: props.location.product.stock,
          discount: props.location.product.discount,
          totalPrice: props.location.product.totalPrice,
        },
        previewImage: props.location.product.image,
      }));
    }
  }, [props.location.product, props.match.params.product]);

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
    if (e.target.id === "hasCard") {
      const { id, checked } = e.target;
      setState({ ...state, formData: { ...state.formData, [id]: checked } });
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
    const button = e.target.id;
    if (button === "delete") {
      const { _id: id } = state.product;
      Swal.fire({
        title: "Eliminar producto",
        text: "¿Estás seguro de que deseas eliminar este producto? Esta acción no puede revertirse",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.value) {
          setState({ ...state, loading: true });
          console.log(id)
          const res = await axios.delete(`/api/products/${id}`);
          console.log(res);
          setState({ ...state, loading: false });
          Swal.fire({
            title: "Producto eliminado exitosamente",
            icon: "success",
          }).then(() => {
            history.replace("/admin");
            return;
          });
        }
      });
    } else {
      setState({ ...state, loading: true });
      try {
        let formData;
        if (state.formData.image) {
          const { data: image } = await axios.post(
            "/api/products/image",
            state.formData.image
          );
          formData = { ...state.formData, image: image };
        } else {
          formData = { ...state.formData };
        }
        await axios.put("/api/products", formData);
        setState({ ...state, loading: false });
        Swal.fire({
          title: "Producto editado",
          text: "Producto editado exitosamente!",
          icon: "success",
        }).then(() => {
          history.push("/admin");
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error inesperado :c",
        });
        console.log(error);
      }
    }
  };

  const { product, loading } = state;
  const { image, name, price, description, discount, totalPrice, stock, hasCard } =
    product || {};
  const mockImage =
    "https://store-images.s-microsoft.com/image/apps.38282.13733306562729316.049f2fd1-b066-4cb5-b5ef-317d282a0b02.ca5b4cd1-6cda-4b13-80af-d7d8e5ba2256?w=162&h=162&q=90&mode=crop";

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="adminproductpage-container">
          <div className="adminproductpage__image-container">
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
          <div className="productpage__info-container">
            <form className="productpage__info-container__form">
              <h1>Editar producto</h1>
              <div className="productpage__info-container__form__input-container">
                <label
                  className="productpage__info-container__form__label"
                  htmlFor="name"
                >
                  Nombre del producto
                </label>
                <input
                  onChange={handleChange}
                  className="productpage__info-container__form__input"
                  defaultValue={name}
                  id="name"
                  type="text"
                />
              </div>
              <div className="productpage__info-container__form__input-container">
                <label
                  className="productpage__info-container__form__label"
                  htmlFor="image"
                >
                  Imágen
                </label>
                <label className="type-button" htmlFor="image">
                  Subir imágen
                </label>
                <input
                  className="productpage__info-container__form__input--file"
                  onChange={handleUpload}
                  id="image"
                  type="file"
                />
              </div>
              <div className="productpage__info-container__form__input-container">
                <label
                  className="productpage__info-container__form__label"
                  htmlFor="discount"
                >
                  Descuento
                </label>
                <input
                  onChange={handleChange}
                  className="productpage__info-container__form__input"
                  defaultValue={discount}
                  id="discount"
                  type="number"
                />
              </div>
              <div className="productpage__info-container__form__input-container">
                <label
                  className="productpage__info-container__form__label"
                  htmlFor="price"
                >
                  Precio
                </label>
                <input
                  onChange={handleChange}
                  className="productpage__info-container__form__input"
                  defaultValue={price}
                  id="price"
                  type="number"
                />
              </div>
              <div className="productpage__info-container__form__input-container">
                <label
                  className="productpage__info-container__form__label"
                  htmlFor="stock"
                >
                  Unidades disponibles
                </label>
                <input
                  onChange={handleChange}
                  className="productpage__info-container__form__input"
                  defaultValue={stock}
                  id="stock"
                  type="number"
                />
              </div>
              <div className="productpage__info-container__form__input-container">
                <label
                  className="productpage__info-container__form__label"
                  htmlFor="description"
                >
                  Descripción
                </label>
                <textarea
                  onChange={handleChange}
                  className="productpage__info-container__form__input--textarea"
                  defaultValue={description}
                  id="description"
                  type="text"
                />
              </div>
              <div className="productpage__info-container__form__input-container hascard">
              <input
                onChange={handleChange}
                className="productpage__info-container__form__input type-checkbox"
                type="checkbox"
                id="hasCard"
                defaultChecked={hasCard}
              />
              <label className="productpage__info-container__form__label" htmlFor="hasCard">
                Incluye tarjeta
              </label>
            </div>
              <div className="productpage__info-container__form__buttons-container">
                <input
                  onClick={handleSubmit}
                  id="update"
                  className="productpage__info-container__form__button type-button"
                  type="submit"
                  value="Guardar cambios"
                />
                <input
                  onClick={handleSubmit}
                  id="delete"
                  className="productpage__info-container__form__button type-button"
                  type="submit"
                  value="Eliminar producto"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminProductPage;
