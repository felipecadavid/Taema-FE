import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import Loader from '../../components/Loader/Loader'

import ProductList from "../../components/ProductList/ProductList";

function ProductsPage(props) {
  const [state, setState] = useState({
    category_id: props.match.params.category,
    products: [],
    loading: true,
  });

  useEffect(() => {
    async function getProducts() {
      const { data: products } = await axios.get(
        `/api/products/categories/${state.category_id}`
      );
      setState({ ...state, products, loading: false });
    }
    getProducts();
  }, [state]);

  return <>{state.loading ? <Loader /> : <ProductList products={state.products}/>}</>;
}

export default ProductsPage;
