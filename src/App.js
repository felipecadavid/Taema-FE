import { BrowserRouter, Route } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';

import './App.css';

import Layout from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={Homepage} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
