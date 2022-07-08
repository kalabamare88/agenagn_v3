import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Container, withStyles} from "@material-ui/core";

import NavTabs from './components/NavTabs'
import MainBody from './pages/Home'
import Detail from './pages/Details/'
/*import LoginRegister from './pages/Authentication/LoginRegister'*/
import LoginRegister from './pages/Authentication/Login'
import Footer from './components/Footer'
import Signup from "./pages/Authentication/Signup";
import RegisterHouse from './pages/Addhouse/New'
import Dashboard from './pages/dashboard';
import EditHouse from "./pages/Addhouse/EditHouse";
import Search from "./pages/Home/Search";
import AdminDetail from './pages/dashboard/Admin-dashboard/AdminDetail';
import UserList from './pages/dashboard/Admin-dashboard/UserList';
import UserDetail from './pages/dashboard/Admin-dashboard/UserDetail';
import About from "./pages/About/About";
import UpperFooter from "./components/UpperFooter";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ForgotPassword/ResetPassword";

const useStyles = ((theme) => ({
    root: {},
    mainParts: {
        marginTop: '100px'
    },
}));

class App extends React.Component {
    state = {token: '', searchKeyword: '', isAdmin: false};

    setToken = (token) => {
        localStorage.setItem('token', JSON.stringify(token));
        this.setState({token: token})
    };

    isAdmin = () => {
        const tokenString = localStorage.getItem('admin');
        const user = tokenString ? JSON.parse(tokenString) : false;
        if (user) {
            return user.isAdmin
        } else {
            return false
        }
    }


    getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userToken) {
            return userToken.token
        } else {
            return ''
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <NavTabs getToken={this.getToken} isAdmin={this.isAdmin} />
                    <Container className={classes.mainParts} maxWidth={'xl'}>
                        <Route path='/' exact> <Search/></Route>
                        <Route path='/search' exact component={(props) => <MainBody {...props} />}/>
                        <Route path={process.env.PUBLIC_URL + '/detail/:id'} component={Detail}/>
                        <Route path='/adminDetail/:id' component={(props) => <AdminDetail {...props} getToken={this.getToken}/>}/>
                        <Route path='/userDetail/:id' component={(props) => <UserDetail {...props} getToken={this.getToken}/>}/>
                        <Route path='/userlist'><UserList /></Route>
                        <Route path='/login' exact> <LoginRegister setToken={this.setToken} getToken={this.getToken}/></Route>
                        <Route path='/signup' exact> <Signup setToken={this.setToken} getToken={this.getToken}/></Route>
                        <Route path='/dashboard' exact> <Dashboard getToken={this.getToken}/></Route>
                        <Route path='/register' component={Signup}/>
                        <Route path='/addhouse'> <RegisterHouse getToken={this.getToken}/></Route>
                        <Route path='/resetPassword' exact> <ForgotPassword getToken={this.getToken}/></Route>
                        <Route path='/edithouse/:id' exact component={(props) => <EditHouse {...props} getToken={this.getToken}/>}/>
                        <Route path='/resetPassword/:id' exact component={(props) => <ResetPassword {...props} setToken={this.setToken}/>}/>
                        <Route path='/about' component={About}/>
                    </Container>
                </BrowserRouter>
                <UpperFooter></UpperFooter>
                <Footer/>
            </div>
        );
    }


}

export default withStyles(useStyles)(App);
