import { useEffect, useState } from "react";
import { Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import setUserData from "./actions/setUserData";
import AdminRoute from "./utils/AdminRoute";
import LoginRoute from "./utils/LoginRoute";

import history from "./utils/history";
import ScrollToTop from "./utils/ScrollToTop";

import "./App.css";

import Homepage from "./pages/Homepage/Homepage";
import Layout from "./components/Layout/Layout";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import BuyPage from "./pages/BuyPage/BuyPage";
import Login from "./pages/LoginPage/LoginPage";
import SearchPage from "./pages/SearchPage/SearchPage";

import DasboardPage from "./pages/Admin/DashboardPage/DasboardPage";
import OrderPage from "./pages/Admin/OrderPage/OrderPage";
import AdminProductPage from "./pages/Admin/AdminProductPage/AdminProductPage";
import AdminCreateProduct from "./pages/Admin/AdminCreateProduct/AdminCreateProduct";

import Loader from "./components/Loader/Loader";
import axios from "./utils/axios";

function App() {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true);
  const globalState = useSelector((state) => state);
  useEffect(() => {
    if (globalState.token) {
      async function fetchData() {
        try{
          const data = await axios.get("/api/users/getUserData");
          dispatch(setUserData(data.data));
          setLoading(false);
          console.log(globalState);
  
        } catch(err){
          console.log(err);
          localStorage.removeItem("token");
        }
      }
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Router history={history}>
      <ScrollToTop />
      {!Loading ? (
        <Layout>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/categorias" component={CategoriesPage} />
          <Route exact path="/categorias/:category" component={ProductsPage} />
          <Route exact path="/producto/:product" component={ProductPage} />
          <Route exact path="/carrito" component={CartPage} />
          <Route exact path="/comprar" component={BuyPage} />
          <Route exact path="/search" component={SearchPage} />
          <LoginRoute exact path="/login" component={Login} />
          <AdminRoute exact path="/admin" component={DasboardPage}/>
          <AdminRoute exact path="/admin/order/:id" component={OrderPage}/>
          <AdminRoute exact path="/admin/producto/:product" component={AdminProductPage} />
          <AdminRoute exact path="/admin/nuevo/producto" component={AdminCreateProduct} />
        </Layout>
      ) : (
        <Loader />
      )}
    </Router>
  );
}

export default App;
