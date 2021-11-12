import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const AdminRoute = ({ component: Component, ...rest }) => {
  const authUser = useSelector((state) => state.token);
  const userData = useSelector((state) => state.userData);
  const isAdmin = {userData} || {};
  if(!userData) return <Loader />;
  return (
    <Route
      {...rest}
      render={(props) => (authUser && isAdmin ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default AdminRoute;