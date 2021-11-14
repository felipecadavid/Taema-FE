import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ProductList from "../../components/ProductList/ProductList";

import "./SearchPage.css"

import axios from "../../utils/axios";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Searchpage(props) {
  const query = useQuery();
  const [state, setState] = useState({
    results: [],
    loading: true,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    async function getData() {
      const result = await axios.get(
        `/api/products/search?q=${query.get("q")}`
      );
      console.log(result);
      setState({ results: result.data, loading: false });
    }
    getData();
  }, [query]);

  return (
    <>
      {state.loading ? (
        <Loader />
      ) : state.results.length > 0 ? (
        <ProductList products={state.results} />
      ) : (
        <div className="searchpage__notfound-container">
          <h1>Lo sentimos</h1>
          <h2>No encontramos resultados para tu busqueda, prueba hacer una busqueda diferente o utilizar otras palabras</h2>
        </div>
      )}
    </>
  );
}

export default Searchpage;
