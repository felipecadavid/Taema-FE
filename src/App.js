import { BrowserRouter, Route } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';

import './App.css';

import Layout from './components/Layout/Layout';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/categorias" component={CategoriesPage} />
        <Route exact path="/categorias/:category" component={ProductsPage} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
