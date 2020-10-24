import back from "hosts.js"
import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRouteRo = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)  
  useEffect(() => {
    const request = require('request');
    let options = {};
    options = {
      uri: back + '/superusers/checkToken/ro',
      withCredentials: true
    }
    request.post(options, (err, res) => {
    if (err) {
        return console.log(err);
    }
    if(res.statusCode === 200){
        setIsAuthenticated(true);
    }
    else if (res.statusCode === 401){
        setIsAuthenticated(false);
    }
    });
    // eslint-disable-next-line
  }, [])

  if(isAuthenticated === null){
    return <></>
  }

  return (
    <Route {...rest} render={props =>
      !isAuthenticated ? (
        <Redirect to='/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};

export default PrivateRouteRo;