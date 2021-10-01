import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'; 

// Layout Call
import AdminLayoutRoute from './adminLayout/AdminLayout';
import AuthLayoutRoute from './authLayout/AuthLayout';


//Component Call
import CommingSoon from '../../components/commingSoon/CommingSoon';
import RegisterUser from '../../components/user/RegisterUser';
import ListOfUsers from '../../components/user/ListOfUsers';
import SignIn from '../../components/auth/SignIn';
import SignUp from '../../components/auth/SignUp';
import Role from '../../components/role/Role';
import Menu from '../../components/menu/Menu';
import ListOfMenu from '../../components/menu/ListOfMenu';

export default class RoutesList extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/signin" />
                    </Route>
                    <AdminLayoutRoute exact path="/" component={CommingSoon}/>
                    <AdminLayoutRoute exact path="/admin/register" title="Register New User" component={RegisterUser}/>
                    <AdminLayoutRoute exact path="/admin/userlist" title="List of Users" component={ListOfUsers}/>
                   
                    <AdminLayoutRoute exact path="/commingsoon" title="Comming Soon" component={CommingSoon}/>
                   
                    <AdminLayoutRoute exact path="/admin/role" title="Role" component={Role}/>

                    <AdminLayoutRoute exact path="/admin/menu" title="Menu" component={Menu}/>
                    <AdminLayoutRoute exact path="/admin/menulist" title="List of Menu" component={ListOfMenu}/>

                    <AuthLayoutRoute exact path="/signin" component={SignIn}/>
                    <AuthLayoutRoute exact path="/signup" component={SignUp}/>
                </Switch>
            </Router>
        )
    }
}


