import React from "react";
import { Link } from "react-router-dom";

import AdminProductComponent from "../AdminProductComponent/AdminProductComponent";

import "./AdminProductList.css";

function AdminProductList({ products }) {
  return (
      <div className="adminproductlist-container">
        <Link to="/admin/nuevo/producto" className="productlist__new">
          Nuevo
        </Link>
        <div className="productlist-margin admin">
          <div className="productlist-container">
            {products.map((product) => (
              <AdminProductComponent key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
  );
}

export default AdminProductList;
