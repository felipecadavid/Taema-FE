import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import history from "../../utils/history";

import axios from "../../utils/axios";

import "./BuyPage.css";

import BuySingleProduct from "../../components/BuySingleProduct/BuySingleProduct";
import BuyCart from "../../components/BuyCart/BuyCart";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function BuyPage() {
  const query = useQuery();
  const stateCart = useSelector((state) => state.cart);
  const [state, setState] = useState({
    loading: true,
  });

  const product = query.get("product") || "";
  const cart = query.get("cart") || "";
  const quantity = query.get("quantity") || "";

  if (!((product.length || cart) && (quantity.length || cart))) {
    history.replace("/");
  }

  useEffect(() => {
    async function getSingleProduct() {
      const { data } = await axios.get(`/api/products/getOne/${product}`);
      setState({
        ...state,
        loading: false,
        product: data,
      });
    }

    if (!cart) {
      getSingleProduct();
    } else {
      async function getCart() {
        const { data } = await axios.get(`/api/products/getAList`, {
            params: stateCart
        });
        setState({
          ...state,
          loading: false,
          cart: data,
        });
      }
    getCart();
    }
  }, []);

  const { loading } = state;
  return (
    <>
      {loading ? (
        <Loader />
      ) : !cart ? (
        <>
          <BuySingleProduct product={state.product} quantity={quantity} />
        </>
      ) : (
        <BuyCart products={state.cart} />
      )}
    </>
  );
}

export default BuyPage;
