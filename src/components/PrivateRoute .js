import React,{useState,useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';



const PrivateRoute  = ({ component: Component, ...rest }) => {
    
    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem('auth')
              ? <Component {...props} />
              : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
          )} />
    );
}

export default PrivateRoute ;
