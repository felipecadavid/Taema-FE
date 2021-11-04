import { Router, Route } from 'react-router-dom';

import history from './utils/history';

import Homepage from './pages/Homepage/Homepage';

import './App.css';

import Layout from './components/Layout/Layout';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/categorias" component={CategoriesPage} />
        <Route exact path="/categorias/:category" component={ProductsPage} />
        <Route exact path="/producto/:product" component={ProductPage} />
        <Route exact path="/carrito" component={CartPage} />
      </Layout>
    </Router>
  );
}

export default App;
