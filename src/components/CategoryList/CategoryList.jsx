import React, { useEffect, useState } from "react";
import axios from '../../utils/axios';

import CategoryComponent from "../CategoryComponent/CategoryComponent";

import image from '../../assets/logo/Logo.png'

import "./CategoryList.css";

const offlineData = [
  { name: "Category 1", image: image },
  { name: "Category 2", image: image },
  { name: "Category 3", image: image },
  { name: "Category 4", image: image },
  { name: "Category 5", image: image },
  { name: "Category 6", image: image },
  { name: "Category 7", image: image },
  { name: "Category 8", image: image },
];

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
        "Loading..."
      ) : (
        <div className="categories-margin">
          <div className="categories-container">
              {state.data.map((category) => (
                <CategoryComponent
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
