// import React, { useState, useEffect } from "react";
// import {
//   Checkbox,
//   FormControlLabel,
//   withStyles,
//   makeStyles,
// } from "@material-ui/core";
// import InputAdornment from "@mui/material/InputAdornment";

// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
// import Box from "@material-ui/core/Box";
// import Typography from "@material-ui/core/Typography";
// import { useDispatch, useSelector } from "react-redux";
// import { signupUser } from "../../features/auth/authSlice";

// import backEndApi from "../../services/api";
// import { Redirect } from "react-router-dom";

// const SignupImage = process.env.PUBLIC_URL + "/img/new.jpg";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display:'flex',
//     justifyContent:'center',
    
//     width: "100%",
//     paddingLeft: "6px",
//     paddingRight: "6px",
//     [theme.breakpoints.down("sm")]: {
//       paddingLeft: 5,
//       paddingRight: 5,
//     },
//   },
//   root: {
//     display: "flex",
//     width:'80%',
//     border: "1px solid rgba(0, 0, 0, .2)",
//     justifyContent:'space-around',
//     flexWrap: "nowrap",
//     background: "white",
//     borderRadius: "15px",
//     height: "650px",
//     padding: 10,
//     "& a": {
//       color: "#3A6351",
//     },

//     [theme.breakpoints.down("sm")]: {
//       "& form": {
//         padding: 0,
//       },
//     },
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
 
   
//     marginLeft:'205px',
//     width: "100%",
//     marginTop:'70px',
//     [theme.breakpoints.down("sm")]: {
//       /*width:'80%'*/
//     },
//     "@media (max-width:760px)": {
//       marginLeft:'25px',
//     },
//   },
//   submit: {
//     background: "#3293A8",
//     borderRadius: "5px",
//     width: "60%",
//     height: "50px",
    
//     margin: theme.spacing(3, 0, 2),
//     "&:hover": {
//       background: "rgba(50, 147, 168,0.79)",
//     },
//     "@media (max-width:760px)": {
//       width:"80%"
//     },
//   },
//   email:{
//     background: "#3F51B5",
//     borderRadius: "5px",
//     width: "60%",
//     height: "50px",
    
//     margin: theme.spacing(3, 0, 2),
//     "&:hover": {
//       background: "rgba(	63, 81, 181,0.79)",
//     }, 
//     "@media (max-width:760px)": {
//       width:"80%"
//     },
//   },

//   texts:{marginLeft:'-300px',
//   "@media (max-width:760px)": {
//     marginLeft:'-105px',
//   },
// },
//   textField: {
//     margin: "10px 0",
//     borderRadius: "10px",
//     width: "60%",
   
//     borderTopLeftRadius: "10px",
//     borderBottomLeftRadius: "10px",
//     border: "0px solid #eee",
//     borderLeftWidth: "7px",
//     borderLeftColor: "rgba(215,215,215,0.47)",
//     "& input": {
//       color: "rgba(57,50,50,0.25)",
//       border: "0px solid #eee",
//       height:'25px',
//       borderRadius: "10px",
//       width: "100%",
//     },
//     "@media (max-width:760px)": {
//       width: "80%",
//     },
//   },
 
//   imgHolder: {
  
//     backgroundColor: "rgba(215,215,215,0.1)",
//     marginLeft:'25px',
//     borderRadius: "15px",
//     marginBottom: "auto",
//     display: "flex",
//     marginTop:'auto',
//     height: "auto",
//     paddingBottom: "50px",
//     [theme.breakpoints.down("sm")]: {
//       display: "none",
//     },
//   },
// }));

// function Signup() {
//   const [state, setState] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phoneNumber:"",
//     confirmPassword: "",
//     isCheck: false,
//     errorMessage: "",
//     successMessage: "",
//     redirect: false,
//   });
//   const dispatch = useDispatch();
//   const {
//     registerData,
//     isRegisterFetching,
//     isRegisterSuccess,
//     isRegisterError,
//   } = useSelector((state) => state.auth);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setphoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isCheck, setIsCheck] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [redirect, setRedirect] = useState("");

//   const classes = useStyles();

//   const onFormSubmit = (e) => {
//     e.preventDefault();
//     // setState({ errorMessage: "" });
//     // setState({ successMessage: "" });
//     setErrorMessage("");
//     setSuccessMessage("");

//     validateInput();
//   };
//   const signUpApiRequest = (signUpDetails) => {
//     dispatch(signupUser(signUpDetails));
//     // const { registerData } = await backEndApi.post("/signUpUser", signUpDetails);
//     if (registerData === "userExist") {
//       setErrorMessage("The email that you have provided is already in use.");
//     } else {
//       // setState({
//       //   redirect: true,
//       //   errorMessage: "",
//       //   successMessage: "You have successfully  Signed Up.",
//       // });
//       setRedirect(true);
//       setErrorMessage("");
//       setSuccessMessage("You have successfully  Signed Up.");
//     }
//   };
//   const validateInput = () => {
//     const signUpUser = {
//       name: name,
//       email: email,
//       phoneNumber:phoneNumber,
//       password: password,
//       confirmPassword: confirmPassword,
//     };

//     var mailFormat =
//       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//       var pattern = new RegExp(/^[0-9\b]+$/);

//     if (name && email || phoneNumber &&  password && confirmPassword) {
//       if (password !== confirmPassword) {
//         // setState({
//         //   errorMessage: "The passwords that you have entered does not match.",
//         // });
//         setErrorMessage("The passwords that you have entered does not match.");
//       } else if (password.length < 6) {
//         // setState({
//         //   errorMessage: "Password should be more than 6 characters",
//         // });
//         setErrorMessage("Password should be more than 6 characters");
//       } else if (!mailFormat.test(email) && (!pattern.test(phoneNumber))) {
//         // setState({
//         //   errorMessage: "The email that you have provided is invalid.",
//         // });
//         setErrorMessage("The email that you have provided is invalid.");
//       } else if (!isCheck) {
//         // setState({
//         //   errorMessage:
//         //     "You have to agree to the Privacy Policy and Terms Of Use.",
//         // });
//         setErrorMessage(
//           "You have to agree to the Privacy Policy and Terms Of Use."
//         );
//       } else {
//         if (errorMessage === "") {
//           signUpApiRequest(signUpUser);
//           /*/!*axios.post('http://localhost:5000/signUpUser', signupUser)*!/
//                     axios.post('https://damp-fjord-23317.herokuapp.com/signUpUser', signUpUser)
//                         .then(res => {

//                             }
//                         )*/
//         }
//       }
//     } else {
//       // setState({ errorMessage: "Please fill all the inputs." });
//       setErrorMessage("Please fill all the inputs.");
//     }
//   };
//   const onNameChange = (e) => {
//     // setState({ name: e.target.value });
//     setName(e.target.value);
//   };
 
//   const onphoneNumberChange = (e)=>{
//     setphoneNumber(e.target.value);
//   }
//   const onPasswordChange = (e) => {
//     // setState({ password: e.target.value });
//     setPassword(e.target.value);
//   };
 
 
//   const errorCheck = () => {
//     if (errorMessage) {
//       return (
//         <Typography
//           variant="h6"
//           style={{
//             color: "red",
//             marginLeft: "5px",
//             fontSize: "14px",
//           }}
//         >
//           {errorMessage}
//         </Typography>
//       );
//     } else {
//       return (
//         <Typography variant="body2" style={{ color: "red", display: "none" }}>
//           ''
//         </Typography>
//       );
//     }
//   };
//   const successCheck = () => {
//     if (successMessage) {
//       return (
//         <Typography variant="h6" style={{ color: "green", marginLeft: "5px" }}>
//           {successMessage}
//         </Typography>
//       );
//     } else {
//       return (
//         <Typography variant="body2" style={{ color: "red", display: "none" }}>
//           ''
//         </Typography>
//       );
//     }
//   };
//   if (redirect) {
//     return <Redirect to="/login" />;
//   }
//   return (
//     <div className={classes.container}>
//       <div className={classes.root}>
//         <div className={classes.imgHolder}>
//           <img
//             src={SignupImage}
//             alt=""
//             width="93%"
//             height="420px"
//             style={{
//               borderRadius: "8px",
//               marginTop: "20px",
//               marginLeft: "20px",
//               marginBottom: "-20px",
//             }}
//           />
//         </div>

//         <div
//           style={{ display: "flex", flexDirection: "column", heigh: "auto" }}
//         >
          
//           <form className={classes.form} noValidate onSubmit={onFormSubmit}>
//            <Typography
//             align="center"
//             component="h1"
//             variant="h5"
//             className={classes.texts}
//             style={{ padding: 10 }}
//           >
//             Sign Up
//           </Typography> 
//           <TextField
//             variant="outlined"
//             margin="none"
//             required
//             fullWidth
//             id="phone-number"
//             onChange={onphoneNumberChange}
//             label="Phone-number"
//             name="Phone-number"
//             autoFocus
//             placeholder="eg, 925762589"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">+251</InputAdornment>
//                     ),
                  
//                   }}
//             className={classes.textField}
//           />
//             <TextField
//               variant="outlined"
//               margin="none"
//               required
//               fullWidth
//               name="password"
//               onChange={onPasswordChange}
//               label="Password"
//               type="password"
//               id="password"
              
//               inputProps={{
//                 minLength: 6,
//               }}
//               className={classes.textField}
//             />
            

            

//             {errorMessage ? errorCheck() : successCheck()}

//             <Button
//               id="SignUp"
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Continue
              
//             </Button>
//             <Typography
//             align="center"
//             component="h1"
//             variant="h6"
//             className={classes.texts}
           
//           >
//                 Or 
          
//           </Typography>
//           <Button
//               id="SignUp"
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.email}
//             >
//               Sign up with email
              
//             </Button>
//             <div>
//               <div>
//                 <Box mt={2} style={{ fontWeight: "600",marginLeft:'25px' }} >
//                   Already have an account
//                   <Link href="/login" variant="body2" id="goToLogin" style={{color:'blue', marginLeft:'1px', textDecoration:'underline'  }}>
//                     {" Log in"}
//                   </Link>
//                 </Box>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
