import React, { Component } from 'react';  
import { Route } from 'react-router-dom';  
import './AuthCss.css'

const AuthLayout = ({ children }) => {   
  var componentData = {children}
    return(
      <div className="authLayout"> 
        {children}
      </div>
    )  
};  
  
const AuthLayoutRoute = ({component: Component, ...rest}) => {  
  var parameter = {...rest}
return (  
  <Route {...rest} render={matchProps => (  
    <AuthLayout>  
        <Component {...matchProps} title = {parameter.title} />  
    </AuthLayout>  
  )} />  
)  
};  
  
export default AuthLayoutRoute;