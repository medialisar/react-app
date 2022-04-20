import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function UserOnlyRoute({ children, ...rest }) {
  const accessToken = useSelector((state) => state.spotify.accessToken);

  return <Route {...rest}>{accessToken ? children : <Redirect to={'/'} />}</Route>;
}
