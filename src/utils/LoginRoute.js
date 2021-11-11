import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const LoginRoute = ({ component: Component, ...rest }) => {
  const authUser = useSelector((state) => state.token);
  return (
    <Route
      {...rest}
      render={(props) => (!authUser ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default LoginRoute;