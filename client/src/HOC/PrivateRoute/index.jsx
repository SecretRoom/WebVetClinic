/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (properties) => {
  const {
    isAuthenticated, component: Component, data,
  } = properties;
  const prepProps = { ...properties }
  delete prepProps.component
  return (
    <Route
      {...prepProps}
      render={(props) => (isAuthenticated ? <Component data={data} {...props} {...properties} /> : <Redirect to="/login" />)}
    />
  )
};

export default PrivateRoute;
