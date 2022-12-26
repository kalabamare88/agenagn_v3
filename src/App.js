import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Container, withStyles, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import NavTabs from "./components/NavTabs";
import MainBody from "./pages/Home";
import Detail from "./pages/Details/";
/*import LoginRegister from './pages/Authentication/LoginRegister'*/
import LoginRegister from "./pages/Authentication/Login";
import Footer from "./components/Footer";
import Signup from "./pages/Authentication/Signup";
import RegisterHouse from "./pages/Addhouse/New";
import Dashboard from "./pages/dashboard";
import EditHouse from "./pages/Addhouse/EditHouse";
import Search from "./pages/Home/Search";
import AdminDetail from "./pages/dashboard/Admin-dashboard/AdminDetail";
import UserList from "./pages/dashboard/Admin-dashboard/UserList";
import UserDetail from "./pages/dashboard/Admin-dashboard/UserDetail";
import About from "./pages/About/About";
import SignupEmail from './pages/Authentication/SignUpEmails';
import SignUpPhone from "./pages/Authentication/SignupPhone";
import UpperFooter from "./components/UpperFooter";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ForgotPassword/ResetPassword";
import { getDashboardData } from "./features/dashboard/dashboardSlice";

// import { getDashboardData } from "./features/dashboard/dashboardSlice";
// import { getDashboardData } from "./features/dashboard/dashboardSlice";
// import { getDashboardData } from "./features/dashboard/dashboardSlice";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#EEEEEE",
  },
  mainParts: {
    paddingTop: "100px",
  },
}));

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    token: "",
    searchKeyword: "",
    isAdmin: false,
  });

  const [sideBar, setSideBar] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(getDashboardData());
  }, []);

  const isAdmin = () => {
    const tokenString = localStorage.getItem("admin");
    const user = tokenString ? JSON.parse(tokenString) : false;
    if (user) {
      return user.isAdmin;
    } else {
      return false;
    }
  };

  return (
    <div className={classes.root}>
      
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <NavTabs
          // getToken={this.getToken}
          sideBar={sideBar}
          isAdmin={isAdmin}
        />
        <Container className={classes.mainParts} maxWidth={"xl"}>
          <Route path="/" exact>
            {" "}
            <Search setSideBar={setSideBar} />
          </Route>
          <Route
            path="/search"
            exact
            component={(props) => <MainBody {...props} />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/detail/:id"}
            component={Detail}
          />
          <Route
            path="/adminDetail/:id"
            component={(props) => (
              <AdminDetail
                setSideBar={setSideBar}
                // getToken={getToken}
              />
            )}
          />
          <Route
            path="/userDetail/:id"
            component={(props) => (
              <UserDetail
                setSideBar={setSideBar}
                {...props}
                // getToken={getToken}
              />
            )}
          />
          <Route path="/userlist">
            <UserList setSideBar={setSideBar} />
          </Route>
          <Route path="/login" exact>
            {" "}
            <LoginRegister
              setSideBar={setSideBar}
              // setToken={setToken}
              // getToken={getToken}
            />
          </Route>


          <Route path="/signup" exact>
            {" "}
            <Signup
              setSideBar={setSideBar}
              // setToken={setToken}
              // getToken={getToken}
            />
          </Route>

          <Route path="/SignUpEmail" exact>
            {" "}
            <SignupEmail
              setSideBar={setSideBar}
              // setToken={setToken}
              // getToken={getToken}
            />
          </Route>

          <Route path="/SignUpPhone" exact>
            {" "}
            <SignUpPhone
              setSideBar={setSideBar}
              // setToken={setToken}
              // getToken={getToken}
            />
          </Route>
          
          <Route path="/dashboard" exact>
            {" "}
            <Dashboard
              setSideBar={setSideBar}
              // getToken={getToken}
            />
          </Route>
          <Route path="/register" component={Signup} />
          <Route path="/addhouse">
            {" "}
            <RegisterHouse
              setSideBar={setSideBar}
              // getToken={getToken}
            />
          </Route>
          <Route path="/resetPassword" exact>
            {" "}
            <ForgotPassword
              setSideBar={setSideBar}
              // getToken={getToken}
            />
          </Route>
          <Route
            path="/edithouse/:id"
            exact
            component={(props) => (
              <EditHouse
                setSideBar={setSideBar}
                {...props}
                // getToken={getToken}
              />
            )}
          />
          <Route
            path="/resetPassword/:id"
            exact
            component={(props) => (
              <ResetPassword
                setSideBar={setSideBar}
                {...props}
                // setToken={setToken}
              />
            )}
          />
          <Route path="/about" component={About} />
        </Container>
      </BrowserRouter>
      <UpperFooter></UpperFooter>
      <Footer />
    </div>
  );
}

export default App;
