import React, { Component } from 'react';  
import { Route } from 'react-router-dom';  
import './AdminCss.css'
import AdminFooter from './AdminFooter';
import AdminMenu from './AdminMenu';

const AdminLayout = ({ children }) => {   
  var componentData = {children}
    return(
      <div className="adminLayout">
            <AdminMenu />
            <div className="adminChildLayout">
              <div className="titleDiv">{componentData.children.props.title}</div>
              <div className="childComponentDiv">
                {children}
              </div>
            </div>
            <AdminFooter />
      </div>
    )  
};  
  
const AdminLayoutRoute = ({component: Component, ...rest}) => {  
  var parameter = {...rest}
return (  
  <Route {...rest} render={matchProps => (  
    <AdminLayout>  
        <Component {...matchProps} title = {parameter.title} />  
    </AdminLayout>  
  )} />  
)  
};  
  
export default AdminLayoutRoute;