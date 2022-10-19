import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { loginUser } from "../../features/auth/authSlice";
import { useHistory } from "react-router-dom";
import backEndApi from "../../services/api";

const loginImage = process.env.PUBLIC_URL + "/img/new.jpg";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingLeft: "16px",
    paddingRight: "16px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    background: "rgba(238,238,238,0.87)",
    borderRadius: "15px",
    height: "100vh",
    padding: 10,
    "& a": {
      color: "#5066e4",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "40vh",
    width: "100%",
    [theme.breakpoints.down("sm")]: {},
  },
  submit: {
    background: "#3F51B5",
    borderRadius: "5px",
    width: "100%",
    height: "50px",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      background: "rgba(53,68,152,0.79)",
    },
  },
  textField: {
    margin: "10px 0",
    borderRadius: "5px",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    border: "0px solid #eee",
    borderLeftWidth: "7px",
    borderLeftColor: "rgba(215,215,215,0.87)",
    "& input": {
      color: "rgba(57,50,50,0.25)",
      border: "0px solid #eee",
      borderRadius: "30px",
      width: "100%",
    },
  },

  inputAdornment: {
    background: "rgba(215,215,215,0.87)",
    borderRadius: "7px 0px 0px 7px",
  },
  loginImg: {
    borderRadius: "8px",
    marginTop: "20px",
    marginLeft: "20px",
    marginBottom: "-20px",
  },
  loginImgHolder: {
    marginTop: "20px",
    backgroundColor: "rgba(185,194,226,0.66)",
    borderRadius: "15px",
    marginBottom: "auto",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  formHolder: {
    display: "flex",
    flexDirection: "column",
    width: "35%",
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: 10,
    },
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
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const classes = useStyles();

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
        <div className={classes.loginImgHolder}>
          <img
            src={loginImage}
            alt=""
            width="93%"
            height="420px"
            className={classes.loginImg}
          />
        </div>

        <div className={classes.formHolder}>
          <Typography
            align="center"
            component="h1"
            variant="h5"
            style={{ padding: 10 }}
          >
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={onEmailChange}
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
            {/* <FormControlLabel
                              control={<Checkbox value="remember" color="primary"
                                                 onChange={this.onCheckboxChange}/>}
                              label="I have read and agreed to Privacy Policy  & TOU"
                          />*/}
            <Box align="right">
              <Link href="/resetPassword" variant="body2">
                Forgot password?
              </Link>
            </Box>
            {errorCheck()}

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
            <div container justify="center">
              <div item md={6}>
                <Box mt={4} style={{ fontWeight: "800" }}>
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
