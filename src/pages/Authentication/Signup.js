import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  withStyles,
  makeStyles,
} from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../features/auth/authSlice";

import backEndApi from "../../services/api";
import { Redirect } from "react-router-dom";

const SignupImage = process.env.PUBLIC_URL + "/img/image.png";

const useStyles = makeStyles((theme) => ({
  container: {
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
    justifyContent: "space-around",
    flexWrap: "nowrap",
    background: "#eeeeee",
    borderRadius: "15px",
    height: "600px",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "40vh",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      /*width:'80%'*/
    },
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
  imgHolder: {
    marginTop: "20px",
    backgroundColor: "rgba(223,225,232,0.66)",
    borderRadius: "15px",
    marginBottom: "auto",
    display: "flex",
    height: "auto",
    paddingBottom: "50px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function Signup() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isCheck: false,
    errorMessage: "",
    successMessage: "",
    redirect: false,
  });
  const dispatch = useDispatch();
  const {
    registerData,
    isRegisterFetching,
    isRegisterSuccess,
    isRegisterError,
  } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCheck, setIsCheck] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [redirect, setRedirect] = useState("");

  const classes = useStyles();

  const onFormSubmit = (e) => {
    e.preventDefault();
    // setState({ errorMessage: "" });
    // setState({ successMessage: "" });
    setErrorMessage("");
    setSuccessMessage("");

    validateInput();
  };
  const signUpApiRequest = (signUpDetails) => {
    dispatch(signupUser(signUpDetails));
    // const { registerData } = await backEndApi.post("/signUpUser", signUpDetails);
    if (registerData === "userExist") {
      setErrorMessage("The email that you have provided is already in use.");
    } else {
      // setState({
      //   redirect: true,
      //   errorMessage: "",
      //   successMessage: "You have successfully  Signed Up.",
      // });
      setRedirect(true);
      setErrorMessage("");
      setSuccessMessage("You have successfully  Signed Up.");
    }
  };
  const validateInput = () => {
    const signUpUser = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    var mailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (name && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        // setState({
        //   errorMessage: "The passwords that you have entered does not match.",
        // });
        setErrorMessage("The passwords that you have entered does not match.");
      } else if (password.length < 6) {
        // setState({
        //   errorMessage: "Password should be more than 6 characters",
        // });
        setErrorMessage("Password should be more than 6 characters");
      } else if (!mailFormat.test(email)) {
        // setState({
        //   errorMessage: "The email that you have provided is invalid.",
        // });
        setErrorMessage("The email that you have provided is invalid.");
      } else if (!isCheck) {
        // setState({
        //   errorMessage:
        //     "You have to agree to the Privacy Policy and Terms Of Use.",
        // });
        setErrorMessage(
          "You have to agree to the Privacy Policy and Terms Of Use."
        );
      } else {
        if (errorMessage === "") {
          signUpApiRequest(signUpUser);
          /*/!*axios.post('http://localhost:5000/signUpUser', signupUser)*!/
                    axios.post('https://damp-fjord-23317.herokuapp.com/signUpUser', signUpUser)
                        .then(res => {

                            }
                        )*/
        }
      }
    } else {
      // setState({ errorMessage: "Please fill all the inputs." });
      setErrorMessage("Please fill all the inputs.");
    }
  };
  const onNameChange = (e) => {
    // setState({ name: e.target.value });
    setName(e.target.value);
  };
  const onEmailChange = (e) => {
    // setState({ email: e.target.value });
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    // setState({ password: e.target.value });
    setPassword(e.target.value);
  };
  const onConfirmPasswordChange = (e) => {
    // setState({ confirmPassword: e.target.value });
    setConfirmPassword(e.target.value);
  };
  const onCheckboxChange = (e) => {
    if (
      e.target.checked &&
      errorMessage === "You Have to accept the Terms & PP"
    ) {
      // setState({ errorMessage: "" });
      setErrorMessage("");
    }
    // setState({ isCheck: e.target.checked });
    setIsCheck(e.target.checked);
  };
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
  const successCheck = () => {
    if (successMessage) {
      return (
        <Typography variant="h6" style={{ color: "green", marginLeft: "5px" }}>
          {successMessage}
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
  if (redirect) {
    return <Redirect to="/login" />;
  }
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
          style={{ display: "flex", flexDirection: "column", heigh: "auto" }}
        >
          <Typography
            align="center"
            component="h1"
            variant="h5"
            style={{ padding: 10 }}
          >
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={onFormSubmit}>
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="name"
              onChange={onNameChange}
              label="Name"
              name="name"
              autoFocus
              className={classes.textField}
            />
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
              inputProps={{
                minLength: 8,
              }}
              className={classes.textField}
            />
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              onChange={onConfirmPasswordChange}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              id="password"
              className={classes.textField}
            />

            <FormControlLabel
              id="check"
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={onCheckboxChange}
                />
              }
              label="I have read and agreed to Privacy Policy  & TOU"
            />

            {errorMessage ? errorCheck() : successCheck()}

            <Button
              id="SignUp"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isRegisterFetching ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress style={{ color: "#fff" }} />
                </Box>
              ) : (
                "Sign Up"
              )}
            </Button>
            <div>
              <div>
                <Box mt={4} style={{ fontWeight: "800" }}>
                  Already have an account
                  <Link href="/login" variant="body2" id="goToLogin">
                    {" Log in"}
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

export default Signup;
