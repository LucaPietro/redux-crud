import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Router = ({ path, component, ...rest }) => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    return <Route path={path} component={component} {...rest} />;
  }
  return <Redirect to="/login" />;
};

export default Router;
