import  { useState } from "react";
import './style.css';

import { useHistory } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import Paper from '@mui/material/Paper';
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../../context/UserAuthContext";
import { Link } from "react-router-dom";
import {  makeStyles, TextField} from "@material-ui/core";
import flags from 'react-phone-number-input/flags'
import Typography from "@material-ui/core/Typography";

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
        marginLeft:'55px',
        marginTop:'10px'
      },
    },

login:{
  fontWeight:'800',
  marginLeft:'65px',
  "@media (max-width:760px)": {
      
      marginLeft:'15px'
    },

},
phoneinput:{
  width: "70%",
  marginLeft:'auto',
  marginRight:'auto',
  
  padding:'20px',
},
passwordinput:{
  width: "60%",
  display:'flex',
  justifyContent:'center',
  border:'5px solid red',
  marginLeft:'100px',
  marginRight:'auto',
  paddingTop:'9px',
  paddingBottom:'9px',
  border: "1px solid rgba(0, 0, 0, .2)",
     
  background: "white",
  borderRadius: "7px",
  height: "45px",

},
textField: {
 
  border: "0px solid #eee",
  borderLeftWidth: "7px",
  borderLeftColor: "rgba(215,215,215,0.47)",
  "& input": {
    color: "rgba(57,50,50,0.25)",
    border: "0px solid #eee",
    height:'25px',
    borderRadius: "10px",
    width: "10%",
  },
  "@media (max-width:760px)": {
    width: "80%",
  },
},
texts:
{marginLeft:'20px',
"@media (max-width:760px)": {
  marginLeft:'-105px',
}},
inputAdornment: {
  background: "rgba(215,215,215,0.87)",
  borderRadius: "7px 0px 0px 7px",
},
authentication:{
  
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
 
  borderRadius: "15px",
  
  marginLeft:'25px',
  borderRadius: "15px",
  marginBottom: "auto",
  
  width:"50%",
  marginTop:'auto',
  height: "auto",
 
  "@media (max-width:960px)": {
    width: "80%",
  },
},

phoneauth:{
  
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
 
  borderRadius: "15px",
  
  marginLeft:'25px',
  borderRadius: "15px",
  marginBottom: "auto",
  
  
  marginTop:'auto',
  height: "auto",
  paddingBottom: "11px",
  "@media (max-width:960px)": {
    width: "80%",
  },
},
PhoneInputInput:{
  flex: "1 1",
  
  height: "30px",
  borderRadius: "5px",
  border: "1px solid red",
  
},
email:{
  background: "#3F51B5",
  color:'white',
  borderRadius: "5px",
  width: "57%",
  height: "47px",
  
  margin: theme.spacing(1, 0, 2),
  "&:hover": {
    background: "rgba(	63, 81, 181,0.79)",
  }, 
  marginLeft:'40px',
  "@media (max-width:760px)": {
    width:"80%"
  },
},
buttons: {
  display: "flex",
  flexDirection:'column',
  justifyContent: "center",
  alignItems: "center",

},

buttonss: {
  display: "flex",

  justifyContent: "center",
  alignItems: "center",

},
buttonone: {
  paddingLeft: "20px",
  paddingRight: "20px",
  background: "#3293A8",
  paddingTop: "13px",
  border:'0.5px solid black',
  paddingBottom: "13px",
  borderRadius: "5px",
  marginLeft: "20px",
  marginTop: "25px",
  marginBottom: "15px",
  color: "#fff",
  textTransform: "none",
  width:'60%',

  "@media (max-width:980px)": {
    paddingLeft: "50px",
    paddingRight: "50px",
    display:'block',
  },
  textsField:{
    width:'100%',
    
    marginLeft:"1000px",
   
  },
  text:{
    marginLeft: "400px",
    textAlign:'center',
  }
  ,
  inputsContainer: {
    marginLeft: "400px",
    width:'100%',
  },
  input: {
    marginTop: "20px",
    marginBottom: "20px",
  width: "100%",
  height: "40px",
  border: "5px solid rgba(0, 0, 0, .5)",
  justifyContent:'space-around',
 
  borderRadius: "5px",
  
  padding: 15,
    background: "white",
    borderRadius: "7px",
  },
  recaptha:{
    marginLeft:'450px',
  },
  "&:hover": {
    color: "black",
    cursor: "pointer",
    color: "rgba(215,215,215,0.9)",
  },
},
buttontwo: {
 
  paddingLeft: "20px",
  paddingRight: "20px",
  background: "#3293A8",
  paddingTop: "8px",
  paddingBottom: "8px",
  borderRadius: "5px",
  marginLeft: "15px",
  marginTop: "15px",
  color: "#fff",
  textTransform: "none",
  width:'75%',
  "@media (max-width:980px)": {
    paddingLeft: "20px",
    paddingRight: "25px",
    display:'block',
  },
  recaptha:{
    marginLeft:'450px',
  },
  "&:hover": {
    color: "black",
    cursor: "pointer",
    color: "rgba(215,215,215,0.9)",
  },
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
},
}));
const SignUpPhone = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const [password, setPassword] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const historys = useHistory();
  

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };
  const onPasswordChange = (e) => {
    // setState({ password: e.target.value });
    setPassword(e.target.value);
  };
  const classes = useStyles();
  const verifyOtp = async (e) => {
    
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      console.log('yes')
      historys.push('/login')
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      historys.push("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

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
      <div className={classes.authentication}>
      <Paper elevation={0} sx={{ borderRadius: '15px', border:'3px solid black' }}>
          <div className={classes.phoneauth}>
          <Typography
              align="center"
              component="h3"
              variant="h4"
              className={classes.texts}
              
            >
                  Sign Up
            
            </Typography>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
          
            <PhoneInput
              flags={flags}
              className={classes.phoneinput}
              defaultCountry="ET"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
              inputProps={{
                name: 'phone',
                country:'us',
                required: true,
                autoFocus: true
              }}
              
            
             containerStyle={{margin:'20px'}}
    
                dropdownStyle={{height:'50px'}}
            />
            {/* <TextField
              variant="outlined"
              id="outlined-name"
              margin="none"
              required
              fullWidth
              name="password"
              onChange={onPasswordChange}
              label="Password"
              type="password"
             
              autoComplete="current-password"
              inputProps={{
                minLength: 6,
              }}
              className={classes.textsField}
            /> */}
            <div className={classes.inputsContainer}>
                <input
                      name="SquareMeter"
                      type="password"
                     
                      placeholder="Enter Your password here"
                      className={classes.passwordinput}
                      onChange={onPasswordChange}
                    />
            </div>
            
            <div id="recaptcha-container" className={classes.recaptha}></div>
          </Form.Group>
          <div className="button-right">
            <Link></Link>
          </div>
          <div className={classes.buttons}>
          
            <Button type="submit" variant="primary"  className= {classes.buttonone}>
              Send 
            </Button>
          </div>
        </Form>


        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          
            <TextField
              type="otp"
            
              className={classes.input}
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
        
          <div className={classes.buttonss}>
            <Link to="/">
              <Button variant="primary"
              className={classes.buttontwo}
              >Cancel</Button>
            </Link>
          
            <Button type="submit" variant="primary" className={classes.buttontwo}>
              Verify
            </Button>
          </div>
        </Form>
          </div>
        </Paper>
          

          <div className={classes.buttons}>
          <Typography
              align="center"
              component="h1"
              variant="h6"
              className={classes.texts}
              
            >
                  Or 
            
            </Typography>
            <Button
                id="SignUp"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.email}
                onClick={handleGoogleSignIn}
              >
                Sign up with email
                
              </Button>
          </div>
      </div>
      
      </div>
      

    </div>
  );
};

export default SignUpPhone;
