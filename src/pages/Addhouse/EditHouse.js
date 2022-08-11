import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, withStyles } from "@material-ui/core";
import { Redirect, useParams } from "react-router-dom";

import { DropzoneArea } from "material-ui-dropzone";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import smallhouse from "../images/upright.png";
import "./inputlocation.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backEndApi from "../../services/api";
import moment from "moment";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { editHouseUpdate, editHouse } from "../../features/house/houseSlice";
import { useDispatch, useSelector } from "react-redux";

const useStyles = (theme) => ({
  root: {
    "& input[type=number]": {
      "&::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
      },
      "&::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
      },
      "-moz-appearance": "textField",
    },
    "& .MuiTypography-body2": {
      fontWeight: 800,
    },

    "& .MuiFormLabel-root": {
      fontWeight: 600,
      fontSize: 14,
      marginTop: -7,

      color: "#3378BE",
    },
    "& form": {
      /*[theme.breakpoints.down('sm')]:{
                padding:'0'
            }*/
    },
    "@media (max-width:600px)": {
      "& form": {
        padding: "0px",
      },
    },
  },
  firstGrid: {
    background: "white",
    boxShadow: "-9px 18px 16px rgba(.50, .5, .5, 0.05)",
    borderRadius: "5px",
  },
  input: {
    padding: "10px",
    marginTop: "5px",
    width: "100%",
    height: "40px",
  },
  dataPicker: {
    "& .react-datepicker-wrapper": {
      display: "block",
    },
    "& input": {},
  },

  leadertitle: {
    color: "#3378BE",
    marginBottom: "15px",
  },
  addhouseimage: {
    position: "absolute",
    top: 320,
    left: 70,
    width: 400,
    "@media (max-width:1220px)": {
      left: 45,
      width: 300,
    },
    "@media (max-width:960px)": {
      display: "none",
    },
  },
  options: {
    color: "white",

    paddingLeft: "25px",
    paddingRight: "25px",
    borderRadius: "8px",
    paddingTop: "6px",
    paddingBottom: "6px",
    cursor: "pointer",
  },

  textarea: {
    padding: "10px",
    resize: "none",
    width: "100%",
    background: "#EEEEEE",
    border: "0.5px solid #9e9e9e",
    borderRadius: "5px",
    height: "125px",
    "&::-webkit-input-placeholder": {
      color: "rgba(57,50,50,0.3)",
    },

    "&::-moz-placeholder": {
      /* Firefox 19+ */ color: "rgba(57,50,50,0.3)",
    },

    "&:-ms-input-placeholder": {
      /* IE 10+ */ color: "rgba(57,50,50,0.3)",
    },
    "&:-moz-placeholder": {
      /* Firefox 18- */ color: "rgba(57,50,50,0.3)",
    },
    "@media (max-width:960px)": {
      width: "100%",
    },
  },
  inputsContainer: {
    margin: "30px",
  },
  headertitle: {
    color: "black",
    fontWeight: "bold",
    display: "flex",

    justifyContent: "center",
    marginRight: "40px",
    padding: "10px",
  },
  buttons: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: "50px",
  },
  buttonone: {
    paddingLeft: "40px",
    paddingRight: "40px",
    background: "#3293A8",
    paddingTop: "5px",
    paddingBottom: "5px",
    borderRadius: "5px",
    marginLeft: "15px",
    color: "#fff",
    textTransform: "none",

    "@media (max-width:980px)": {
      paddingLeft: "50px",
      paddingRight: "50px",
    },
    "&:hover": {
      color: "black",
    },
  },

  dropZone: {
    "& .MuiDropzoneArea-root": {
      background: "#EEEEEE",
      marginBottom: "30px",
      maxHeight: "343",
      width: "150%",
      padding: "10px",
      borderRadius: "10px",

      border: ".5px solid #9e9e9e",
      "@media (max-width:960px)": {
        width: "100%",
      },
      "@media (max-width:460px)": {
        width: "17rem",
      },
    },
  },
  imageleader: {
    width: "80%",
  },
  inputError: {
    color: "red",
    fontSize: "13px",
    display: "none",
    fontWeight: "normal",
  },
});
let otherArray = [];

function EditHouse(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    houseData,
    houseDetailIsLoading,
    houseDetailIsSuccess,
    houseUpdateLoading,
    houseUpdateSuccess,
  } = useSelector((state) => state.house);
  props.setSideBar(false);
  const [theDocs, setTheDocs] = useState("");
  const [originalHouseId, setOriginalHouseId] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [squareMeter, setSquareMeter] = useState("");
  const [bedRoom, setBedRoom] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [floor, setFloor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [guestHouse, setGuestHouse] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [editedEncodedAvatarUrl, setEditedEncodedAvatarUrl] = useState("");
  const [listingStatus, setListingStatus] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const [file, setFile] = useState([]);
  const [isRedirectToHomepage, setIsRedirectToHomepage] = useState("");

  useEffect(() => {
    dispatch(editHouse(id));
  }, []);

  useEffect(() => {
    dispatch(editHouse(id));
  }, [props.match.params.id, setEditedEncodedAvatarUrl, setTheDocs]);

  useEffect(() => {
    if (houseDetailIsSuccess) {
      setTheDocs(houseData);
      const imagesImage = () => {
        const files = houseData.files;
        otherArray = [];
        if (files?.constructor === Array) {
          files.forEach((the) => {
            const what = `http://localhost:5000/images/products/${houseData.docs.ownerEmail}/${houseData.docs._id}/${the}`;
            otherArray.push(what);
          });
        }
        console.log(otherArray, "what");
        return otherArray;
      };

      console.log(imagesImage(), "and and and what");
      setOwnerEmail(houseData.docs.ownerEmail);
      setOriginalHouseId(houseData.docs._id);
      setLocation(houseData.docs.location);
      setSquareMeter(houseData.docs.squareMeter);
      setBedRoom(parseInt(houseData.docs.bed_room));
      setMonthlyPayment(parseInt(houseData.docs.monthly_payment));
      setFloor(parseInt(houseData.docs.floor));
      setPhoneNumber(parseInt(houseData.docs.phone_number));
      setGuestHouse(houseData.docs.guest_house ? "yes" : "no");
      setDescription(houseData.docs.description);
      setAvailabilityDate(houseData.docs.availabilityDate);
      setListingStatus(houseData.docs.listingStatus);
      setFile(houseData.files);
      setReviewStatus(houseData.docs.reviewStatus);
      setEditedEncodedAvatarUrl(houseData.docs.encodedAvatarUrl);
      console.log(houseData, "data will be data");
    }
  }, [houseDetailIsSuccess]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    validateForm(e);
  };
  const listingStatusFilter = (e) => {
    console.log(e.currentTarget.value, listingStatus);
    if (e.currentTarget.value === "NA" && listingStatus === "Submitted") {
      return "Draft";
    } else if (
      e.currentTarget.value === "Pending" &&
      listingStatus === "Draft"
    ) {
      return "Submitted";
    } /*else if (e.currentTarget.value === "Inactive" && listingStatus === "Active"){
            return "Inactive"
        }else if (e.currentTarget.value === "Active" && listingStatus === "Inactive"){
            return "Active"
        }*/ else {
      return listingStatus;
    }
  };
  const reviewStatusFilter = (e) => {
    return e.currentTarget.value;
  };
  const validateForm = (e) => {
    const product = {
      editedEncodedAvatarUrl: editedEncodedAvatarUrl,
      theDocs: theDocs,
      originalId: originalHouseId,
      ownerEmail: ownerEmail,
      location: location,
      squareMeter: squareMeter,
      description: description,
      bedRoom: parseInt(bedRoom),
      floor: parseInt(floor),
      monthlyPayment: parseInt(monthlyPayment),
      phoneNumber: parseInt(phoneNumber),
      guest_house: guestHouse === "yes",
      availabilityDate: moment(availabilityDate).format("DD-MM-YYYY"),
      listingStatus: listingStatusFilter(e),
      reviewStatus: reviewStatusFilter(e),
    };

    if (!location) {
      document.getElementById("locationError").style.display = "block";
    }
    if (!floor) {
      document.getElementById("floorError").style.display = "block";
    }
    if (!monthlyPayment) {
      document.getElementById("monthlyPaymentError").style.display = "block";
    }
    if (!bedRoom) {
      document.getElementById("bedRoomError").style.display = "block";
    }
    /*if (!guestHouse) {
            document.getElementById('guestHouseError').style.display = 'block';
        }*/
    /* if (!phoneNumber) {
             document.getElementById('phoneNumber').style.display = 'block';
         }*/

    /*if (!file) {
            document.getElementById('dropZoneImage').style.display = 'block';
        }*/

    if (location && floor && monthlyPayment && bedRoom && phoneNumber) {
      submitEditHouseApiRequest(product);
    } else {
      //for not yet validated
      console.log("Form Not Validated");
    }
  };

  const submitEditHouseApiRequest = async (newLaunchDetails) => {
    /*let user = props.getToken();*/

    const formData = new FormData();
    formData.append("file", file);

    dispatch(editHouseUpdate(newLaunchDetails));

    // let response = await axios.post(
    //   "http://localhost:5000/editHouseUpdate",
    //   newLaunchDetails,
    //   {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //       "x-access-token": JSON.parse(localStorage.getItem("token")),
    //     },
    //   }
    // );
    /*let resImage = await backEndApi.post('/uploadProductImage', formData, config);*/

    // console.log("The files and Image success fully uploaded" + response);
    setIsRedirectToHomepage(true);
  };

  const choseButton = () => {
    switch (listingStatus) {
      case "Active":
        if (reviewStatus === "Pending" || reviewStatus === "Rejected") {
          return (
            <React.Fragment>
              <Button
                onClick={onFormSubmit}
                value="Approved"
                variant="contained"
                className={classes.buttonone}
              >
                Cancel Review
              </Button>
              <Button
                onClick={onFormSubmit}
                value="Pending"
                variant="contained"
                className={classes.buttonone}
              >
                {" "}
                Update Detail
              </Button>
            </React.Fragment>
          );
        } else if (reviewStatus === "Approved") {
          return (
            <React.Fragment>
              <Button
                onClick={onFormSubmit}
                value="Pending"
                variant="contained"
                className={classes.buttonone}
              >
                {" "}
                Update Detail
              </Button>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment>
              <Button
                onClick={onFormSubmit}
                value=""
                variant="contained"
                className={classes.buttonone}
              >
                Cancel Review
              </Button>
              <Button
                onClick={onFormSubmit}
                value=""
                variant="contained"
                className={classes.buttonone}
              >
                Update Detail
              </Button>
            </React.Fragment>
          );
        }

      case "Inactive":
        if (reviewStatus === "Pending" || reviewStatus === "Rejected") {
          return (
            <React.Fragment>
              <Button
                onClick={onFormSubmit}
                value="Approved"
                variant="contained"
                className={classes.buttonone}
              >
                Cancel Review
              </Button>
              <Button
                onClick={onFormSubmit}
                value="Pending"
                variant="contained"
                className={classes.buttonone}
              >
                Update Detail
              </Button>
            </React.Fragment>
          );
        } else if (reviewStatus === "Approved") {
          return (
            <React.Fragment>
              <Button
                onClick={onFormSubmit}
                value="Pending"
                variant="contained"
                className={classes.buttonone}
              >
                Update Detail
              </Button>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment>
              <Button
                onClick={onFormSubmit}
                value=""
                variant="contained"
                className={classes.buttonone}
              >
                Cancel Review
              </Button>
              <Button
                onClick={onFormSubmit}
                value=""
                variant="contained"
                className={classes.buttonone}
              >
                Update Detail
              </Button>
            </React.Fragment>
          );
        }
      case "Draft":
        return (
          <React.Fragment>
            <Button
              onClick={onFormSubmit}
              value="NA"
              variant="contained"
              className={classes.buttonone}
            >
              Save As Draft
            </Button>
            <Button
              onClick={onFormSubmit}
              value="Pending"
              variant="contained"
              className={classes.buttonone}
            >
              Submit For Review
            </Button>
          </React.Fragment>
        );
      case "Submitted":
        if (reviewStatus === "Pending" || reviewStatus === "Rejected") {
          return (
            <React.Fragment>
              <Button
                onClick={onFormSubmit}
                value="NA"
                variant="contained"
                className={classes.buttonone}
              >
                Cancel Review
              </Button>
              <Button
                onClick={onFormSubmit}
                value="Pending"
                variant="contained"
                className={classes.buttonone}
              >
                Update Detail
              </Button>
            </React.Fragment>
          );
        } else if (reviewStatus === "Approved") {
          return (
            <React.Fragment>
              <Button
                onClick={onFormSubmit}
                value="Pending"
                variant="contained"
                className={classes.buttonone}
              >
                Update Detail
              </Button>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment>
              <Button
                onClick={onFormSubmit}
                value="Draft"
                variant="contained"
                className={classes.buttonone}
              >
                Cancel Review
              </Button>
              <Button
                onClick={onFormSubmit}
                value="Submitted"
                variant="contained"
                className={classes.buttonone}
              >
                Update Detail
              </Button>
            </React.Fragment>
          );
        }
      default:
        return <div>Something occur</div>;
    }
  };

  const onLocationChanged = (e) => {
    console.log(file);
    if (e.target.value.length === 0) {
      document.getElementById("locationError").style.display = "block";
    } else {
      document.getElementById("locationError").style.display = "none";
    }
    setLocation(e.target.value);
  };

  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
  };
  const onFloorchanged = (e) => {
    if (e.target.value === "Select Floor") {
      document.getElementById("floorError").style.display = "block";
    } else {
      document.getElementById("floorError").style.display = "none";
    }
    setFloor(e.target.value);
  };
  const onMonthlyPaymentChanged = (e) => {
    if (e.target.value.length === 0) {
      document.getElementById("monthlyPaymentError").style.display = "block";
    } else {
      document.getElementById("monthlyPaymentError").style.display = "none";
    }

    setMonthlyPayment(e.target.value);
  };
  const onBedroomChanged = (e) => {
    if (e.target.value.length === "Select Bed Rooms") {
      document.getElementById("bedRoomError").style.display = "block";
    } else {
      document.getElementById("bedRoomError").style.display = "none";
    }
    setBedRoom(e.target.value);
  };
  const onDropZoneChange = (e) => {
    if (e[0]) {
      document.getElementById("dropZoneImage").style.display = "none";
    }

    setFile({ file: e });
  };
  const onGuestHouseChanged = (e) => {
    if (e.target.value.length === 0) {
      document.getElementById("guestHouseError").style.display = "block";
    } else {
      document.getElementById("guestHouseError").style.display = "none";
    }

    setGuestHouse(e.target.value === "yes" ? "yes" : "no");
  };
  const onPhoneNumberChanged = (e) => {
    if (e.target.value.length === 0) {
      document.getElementById("phoneNumberError").style.display = "block";
    } else {
      document.getElementById("phoneNumberError").style.display = "none";
    }

    setPhoneNumber(e.target.value);
  };
  const onAvailabilityChanged = (date) => {
    console.log(date);
    if (date === null) {
      document.getElementById("availabilityError").style.display = "block";
    } else {
      document.getElementById("availabilityError").style.display = "none";
    }

    setAvailabilityDate(date);
  };
  const onSquareMeterChanged = (e) => {
    setSquareMeter(e.target.value);
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }
  if (isRedirectToHomepage) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container>
      <Container className={classes.root} maxWidth="md">
        <Grid
          container
          className={classes.firstGrid}
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs={12} md={6} alignItems="center" justifyContent="center">
            <form>
              <div className={classes.headertitle}>
                <div className="subone">
                  <img
                    src={smallhouse}
                    alt=""
                    className={classes.imageleader}
                  />
                </div>
                <div className="subtwo">
                  <Typography
                    variant="h5"
                    style={{
                      marginBottom: "30px",
                      marginTop: "35px",
                      marginLeft: "-15px",
                    }}
                  >
                    Edit House
                  </Typography>
                </div>
              </div>

              <div className={classes.inputsContainer}>
                <input
                  type="text"
                  list="locationOfCondominium"
                  id="location"
                  name="Myname"
                  className="form__input"
                  placeholder="Location of condominium"
                  onChange={onLocationChanged}
                  value={location}
                />
                <div className="form__label">
                  <label htmlFor="location" className="form__labels">
                    Location
                  </label>
                </div>

                <datalist id="locationOfCondominium">
                  <option value="Ayat Condominium" />
                  <option value="Yeka Abado Condominium" />
                  <option value="Submit Condominium" />
                  <option value="Gelan Condominium" />
                  <option value="Tuludimtu Condominium" />
                  <option value="4 killo Condominium" />
                  <option value="Gotera Condominium" />
                  <option value="Balderas Condominium" />
                  <option value="Mebrathail Condominium" />
                </datalist>

                <Typography
                  variant="body2"
                  id="locationError"
                  className={classes.inputError}
                >
                  You have to entered Location of your condominium.
                </Typography>
              </div>
              <div className={classes.inputsContainer}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Bedroom</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    sx={{ height: 40 }}
                    value={bedRoom}
                    label="Bedroom"
                    onChange={onBedroomChanged}
                    name="selectNumberOfBedrooms"
                  >
                    <MenuItem value="1">0 (studio)</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  type="number"
                  variant="body2"
                  id="bedRoomError"
                  className={classes.inputError}
                >
                  You have to enter number of bed rooms.
                </Typography>
              </div>
              <div className={classes.inputsContainer}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Floor
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    sx={{ height: 40 }}
                    label="Select Floor"
                    value={floor}
                    onChange={onFloorchanged}
                    name="selectNumberOfBedrooms"
                  >
                    <MenuItem value="0">ground</MenuItem>
                    <MenuItem value="1">+1</MenuItem>
                    <MenuItem value="2">+2</MenuItem>
                    <MenuItem value="3">+3</MenuItem>
                    <MenuItem value="4">+4</MenuItem>
                    <MenuItem value="5">+5</MenuItem>
                    <MenuItem value="6">+6</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  variant="body2"
                  id="floorError"
                  className={classes.inputError}
                >
                  you have to select floor.
                </Typography>
              </div>

              <div className={classes.inputsContainer}>
                <TextField
                  label="Monthly payment"
                  className={classes.input}
                  onChange={onMonthlyPaymentChanged}
                  value={monthlyPayment}
                  placeholder="eg, 5000"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span>
                          <i class="fas fa-dollar-sign"></i>
                        </span>
                      </InputAdornment>
                    ),
                    className: classes.input,
                  }}
                />
                <Typography
                  variant="body2"
                  id="monthlyPaymentError"
                  className={classes.inputError}
                >
                  you have to enter monthly payment.
                </Typography>
              </div>
              <div className={classes.inputsContainer}>
                <input
                  name="SquareMeter"
                  type="text"
                  list="squareMetersInput"
                  placeholder="Square meter of your house"
                  className="form__input"
                  onChange={onSquareMeterChanged}
                  value={squareMeter}
                />
                <datalist id="squareMetersInput">
                  <option value="4 x 4"></option>
                  <option value="3 x 4"></option>
                  <option value="5 x 4"></option>
                  <option value="5 x 3"></option>
                </datalist>
                <div className="form__label">
                  <label htmlFor="location" className="form__labelss">
                    Square meters{" "}
                    <span style={{ opacity: "0.5" }}>(optional)</span>
                  </label>
                </div>
              </div>
              <div className={classes.inputsContainer}>
                {/*                                         
                                        selected={this.state.starterdate}
                                        value={moment(this.state.availabilityDate).format("DD-MM-YYYY")} */}
                {/* <TextField
                                        label="Monthly payment"
                                   
                                        className={classes.input}
                                        type="date"
                                        
                                        
                                        value={moment(this.state.availabilityDate).format("YYYY-MM-DD")}
                                        onChange={this.onAvailabilityChanged}
                                        InputProps={{
                                            
                                            className: classes.input
                                        }}
                                    /> */}
                <div className={classes.dataPicker} id="date">
                  <DatePicker
                    name="date"
                    dateFormat="dd-MM-yyyy"
                    dayPlaceholder="21"
                    className={[classes.input]}
                    onChange={onAvailabilityChanged}
                    value={moment(availabilityDate).format("DD-MM-YYYY")}
                  />
                  <div className="form__label">
                    <label htmlFor="location" className="form__labelss">
                      Available date start from
                    </label>
                  </div>
                </div>
                <Typography
                  variant="body2"
                  id="availabilityError"
                  className={classes.inputError}
                >
                  You have to Set Launch Data.
                </Typography>
              </div>
              <div className={classes.inputsContainer}>
                <TextField
                  label="Phone number"
                  name="phone"
                  className={classes.input}
                  onChange={onPhoneNumberChanged}
                  value={phoneNumber}
                  placeholder="eg, 925762589"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+251</InputAdornment>
                    ),
                    className: classes.input,
                  }}
                />

                <Typography
                  variant="body2"
                  id="phoneNumberError"
                  className={classes.inputError}
                >
                  You have to enter your phone number.
                </Typography>
              </div>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.inputsContainer}>
              <Typography variant="body2" className={classes.leadertitle}>
                Upload house image
                <span style={{ opacity: "0.5", fontSize: "12px" }}>
                  (maximum 6 images)
                </span>
              </Typography>

              <Grid style={{ marginTop: "5px" }}>
                <Grid
                  itme
                  xs={12}
                  md={8}
                  className={classes.dropZone}
                  id="upload"
                  data-cy="content"
                >
                  {/*Icon ={}*/}
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    maxFileSize={6000000}
                    filesLimit={"6"}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={onDropZoneChange}
                  />
                  {/*<DropzoneArea getPreviewIcon={this.handlePreviewIcon}
                                                  dropzoneText="Drag and drop a jpg, png or webp Icon, Or click to add"/>*/}
                </Grid>
                <Typography
                  variant="body2"
                  id="dropZoneImage"
                  className={classes.inputError}
                >
                  You have to upload an image.
                </Typography>
              </Grid>
            </div>
            <div className={classes.inputsContainer}>
              <Typography variant="body2" className={classes.leadertitle}>
                is it Guest House
              </Typography>
              <label
                htmlFor="guestYes"
                className={classes.options}
                style={{ background: "#3293A8" }}
              >
                Yes
              </label>
              <input
                type="radio"
                value="yes"
                id="guestYes"
                name="guestRadio"
                placeholder="is it Guest House"
                onChange={onGuestHouseChanged}
              />
              <label
                htmlFor="guestNo"
                className={classes.options}
                style={{ background: "#E21E2A", marginLeft: "10px" }}
              >
                No
              </label>

              <input
                type="radio"
                value="no"
                id="guestNo"
                name="guestRadio"
                onChange={onGuestHouseChanged}
              />
              <Typography
                variant="body2"
                id="guestHouseError"
                className={classes.inputError}
              >
                You have specific if it is guesthouse.
              </Typography>
            </div>

            <div className={classes.inputsContainer}>
              <TextField
                id="outlined-multiline-static"
                name="short Description"
                className={classes.textarea}
                label="Short Description"
                placeholder="short Description about the house"
                multiline
                rows={4}
                variant="outlined"
                value={description}
                style={{ marginTop: "5px" }}
                onChange={onDescriptionChanged}
              />
            </div>
            <br />
            <div className={classes.buttons}>{choseButton()}</div>
            <br />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default withStyles(useStyles)(EditHouse);
