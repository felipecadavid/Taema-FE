import { BrowserRouter, Route } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';

import './App.css';

import Layout from './components/Layout/Layout';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/categorias" component={CategoriesPage} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
