import React, { useState, useEffect } from "react";
import {

  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { loginUser } from "../../features/auth/authSlice";
import { useHistory } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";


import backEndApi from "../../services/api";
import { Redirect } from "react-router-dom";

const SignupImage = process.env.PUBLIC_URL + "/img/new.jpg";

const useStyles = makeStyles((theme) => ({
    container: {
        display:'flex',
        justifyContent:'center',
        
        width: "100%",
        paddingLeft: "6px",
        paddingRight: "6px",
        [theme.breakpoints.down("sm")]: {
          paddingLeft: 5,
          paddingRight: 5,
        },
      },
      root: {
        display: "flex",
        width:'80%',
        border: "1px solid rgba(0, 0, 0, .2)",
        justifyContent:'space-around',
        flexWrap: "nowrap",
        background: "white",
        borderRadius: "15px",
        height: "650px",
        padding: 10,
        "& a": {
          color: "#3A6351",
        },
    
        [theme.breakpoints.down("sm")]: {
          "& form": {
            padding: 0,
          },
        },
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        marginLeft:'205px',
        width: "90%",
        marginTop:'40px',
        [theme.breakpoints.down("sm")]: {
          /*width:'80%'*/
        },
        "@media (max-width:960px)": {
          marginLeft:'105px',
          marginTop:'10px'
        },
      },
  submit: {
    background: "#3293A8",
    borderRadius: "5px",
    width: "70%",
    height: "50px",
    
    margin: theme.spacing(1, 0, 2),
    "&:hover": {
      background: "rgba(50, 147, 168,0.79)",
    },
    "@media (max-width:760px)": {
      width:"80%"
    },
  },

  login:{
    fontWeight:'800',
    marginLeft:'65px',
    "@media (max-width:760px)": {
        
        marginLeft:'15px'
      },

  },
  textField: {
    margin: "10px 0",
    borderRadius: "10px",
    width: "70%",

   
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    border: "0px solid #eee",
    borderLeftWidth: "7px",
    borderLeftColor: "rgba(215,215,215,0.47)",
    "& input": {
      color: "rgba(57,50,50,0.25)",
      border: "0px solid #eee",
      height:'25px',
      borderRadius: "10px",
      width: "100%",
    },
    "@media (max-width:760px)": {
      width: "80%",
    },
  },
  texts:
  {marginLeft:'-210px',
  "@media (max-width:760px)": {
    marginLeft:'-105px',
  }},
  inputAdornment: {
    background: "rgba(215,215,215,0.87)",
    borderRadius: "7px 0px 0px 7px",
  },
  imgHolder: {
  
    backgroundColor: "rgba(215,215,215,0.1)",
    marginLeft:'25px',
    borderRadius: "15px",
    marginBottom: "auto",
    display: "flex",
    width:"70%",
    marginTop:'auto',
    height: "auto",
    paddingBottom: "50px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    width:'40%',
  },
}));

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginData, loginErrorMessage, isLoginSuccess } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { logIn, googleSignIn } = useUserAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const historys = useHistory();
  const classes = useStyles();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      historys.push("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (loginErrorMessage === "notUser") {
      setErrorMessage("Incorrect Username or Password!");
    }
  }, [loginErrorMessage]);

  useEffect(() => {
    if (isLoginSuccess === true) {
      history.push("/dashboard");
    }
  }, [isLoginSuccess]);

  const errorCheck = () => {
    if (errorMessage) {
      return (
        <Typography
          variant="h6"
          style={{
            color: "red",
            marginLeft: "5px",
            fontSize: "14px",
          }}
        >
          {errorMessage}
        </Typography>
      );
    } else {
      return (
        <Typography variant="body2" style={{ color: "red", display: "none" }}>
          ''
        </Typography>
      );
    }
  };

  const onEmailChange = (e) => {
    // setState({ email: e.target.value });
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    // setState({ password: e.target.value });
    setPassword(e.target.value);
  };
  const loginApiRequest = (loginParams) => {
    dispatch(loginUser(loginParams));
    // const { data } = await backEndApi.post("/loginUser", {
    //   params: loginParams,
    // });

    if (loginData !== "notUser") {
      // setState({ errorMessage: "Incorrect Username or Password!" });
      const token = { data: loginData };
      // localStorage.setItem("token", JSON.stringify(token));
      // props.setToken(token);
      // setState({ token: token, redirect: true, isAdmin: data.isAdmin });
      setToken(token);
      setRedirect(true);
      setIsAdmin(loginData?.isAdmin);
    }
  };
  const validateInput = () => {
    const loginDetail = {
      email: email,
      password: password,
    };

    if (email && password) {
      loginApiRequest(loginDetail);
    } else {
      setErrorMessage("Please fill all the inputs!");
      // setState({ errorMessage: "Please fill all the inputs!" });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    validateInput();
  };

  // if (redirect || props.getToken()) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <div className={classes.imgHolder}>
          <img
            src={SignupImage}
            alt=""
            width="93%"
            height="420px"
            style={{
              borderRadius: "8px",
              marginTop: "20px",
              marginLeft: "20px",
              marginBottom: "-20px",
            }}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", heigh: "auto", marginTop:'50px',marginLeft:'-60px' }}
        >
          
          <form className={classes.form} noValidate >
            <Typography
            align="center"
            component="h1"
            variant="h5"
            style={{ padding: 10 }}
            className={classes.texts}
          >
            Login
          </Typography>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="email"
              onChange={onEmailChange}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              className={classes.textField}
            />
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              name="password"
              onChange={onPasswordChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
             
              className={classes.textField}
            />
            

           
            
            <Typography
            align="center"
            
            variant="body2"
            style={{ padding: 10 }}
            className={classes.texts}
          >
           <Link href="/resetPassword" variant="body2">
                Forgot password?
              </Link>
          </Typography>
            
            <Button
              id="login"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Log in
            </Button>
            <Typography
            align="center"
            
            variant="body2"
            style={{ padding: 10 }}
            className={classes.texts}
          >
           Or
          </Typography>
            <Button
              id="login"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{backgroundColor:'#3F51B5'}}
              onClick={handleGoogleSignIn}
            >
              Sign in with Gmail
            </Button>
            <div container justify="center">
              <div >
                <Box  style={{ fontWeight: "800",marginLeft:'60px' }}>
                  Don't have an account?
                  <Link href="/signup" variant="body2" id="gotoSignup">
                    {" Sign Up"}
                  </Link>
                </Box>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
