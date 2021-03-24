import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);
  const { auth } = useSelector((state) => state.user);

  useEffect(() => {
    if (auth) {
      currentAdmin(auth.token)
        .then(() => setOk(true))
        .catch((err) => {
          console.log({ err });
          setOk(false);
        });
    }
  }, [auth]);

  if (ok) {
    return <Route {...rest} />;
  }
  return <LoadingToRedirect />;
};

export default AdminRoute;
