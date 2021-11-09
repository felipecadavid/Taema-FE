import React, { useEffect, useState } from "react";
import axios from '../../utils/axios';

import CategoryComponent from "../CategoryComponent/CategoryComponent";
import Loader from "../Loader/Loader";

import "./CategoryList.css";

function CategoryList() {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    const getData = async () => {
      const query = await axios.get('/api/categories');
      setState((prevState) => ({ ...prevState, data: query.data, loading: false }));
    };
    getData();
  }, []);

  return (
    <>
      {state.loading ? (
        <Loader />
      ) : (
        <div className="categories-margin">
          <div className="categories-container">
              {state.data.map((category) => (
                <CategoryComponent
                  key={category._id}
                  id={category._id}
                  name={category.name}
                  image={category.image}
                />
              ))}

          </div>
        </div>
      )}
    </>
  );
}

export default CategoryList;
