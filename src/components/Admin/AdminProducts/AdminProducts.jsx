import React, { useState, useEffect } from "react";
import axios from '../../../utils/axios'

import Loader from '../../Loader/Loader'

import AdminProductList from "../AdminProductList/AdminProductList";

function AdminProducts(props) {
  const [state, setState] = useState({
    products: [],
    loading: true,
  });

  useEffect(() => {
    async function getProducts() {
      const { data: products } = await axios.get(
        `/api/products`
      );
      setState({ ...state, products, loading: false });
    }
    getProducts();
  }, [state]);

  return (
    <>
      {state.loading ? <Loader /> : <AdminProductList products={state.products} />}
    </>
  );
}

export default AdminProducts;
