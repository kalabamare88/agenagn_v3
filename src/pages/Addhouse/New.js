import React from 'react';
import {Button, Grid, Typography} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone';
import {Navigate, Redirect} from "react-router-dom";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import mainpic from '../images/main.png';
import smallhouse from '../images/upright.png';
import './inputlocation.css'

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import "react-datepicker/dist/react-datepicker.css";
import backEndApi from '../../services/api'
import moment from "moment";
import {withStyles} from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";


const useStyles = theme => ({
    root: {
        "& input[type=number]": {
            "&::-webkit-inner-spin-button": {
                '-webkit-appearance': 'none',
            },
            "&::-webkit-outer-spin-button": {
                '-webkit-appearance': 'none',
            },
            '-moz-appearance': 'textField'
        },
        "& .MuiTypography-body2": {
            fontWeight: 800
        },
        
          "& .MuiFormLabel-root": {
           
            fontWeight:600,
            fontSize:14,
            marginTop:-5,
           
           
            color:'#3378BE'
          },
        "& form":{

            /*[theme.breakpoints.down('sm')]:{
                padding:'0'
            }*/
        },
        "@media (max-width:600px)":{
            "& form":{
                padding:'0px',
            }
        },
    },
    firstGrid: {
        background: 'white',
        boxShadow: '-9px 18px 16px rgba(.50, .5, .5, 0.05)',
        borderRadius: '5px',
        
    },
    

    input: {
        padding: '10px',
        marginTop: '5px',
        width: '100%',
        height: '40px',
    },
    
    dataPicker: {
        "& .react-datepicker-wrapper": {
            display: 'block',
        },
        
        "& hover": {color:'red'}


    },
    
    leadertitle:{
        color:'#3378BE',
        marginBottom:'15px'
    },
    addhouseimage:{
        position:"absolute",
        top: 320,
        left: 70,
        width:400,
        "@media (max-width:1220px)":{
               
                left: 45,
                width:300,
            },
            "@media (max-width:960px)":{
           
                display:'none',
            },
        },
        options :{
            color:'white',
           
            
            paddingLeft:'25px',
            paddingRight:'25px',
            borderRadius:'8px',
            paddingTop:'6px',
            paddingBottom:'6px',
            cursor:'pointer',
            

            
        },
        
    

    textarea: {
        padding: '10px',
        resize: 'none',
        width: '130%',
        background: '#EEEEEE',
        border: '0.5px solid #9e9e9e',
        borderRadius: '5px',
        height: '125px',
        "&::-webkit-input-placeholder": {
            color: 'rgba(57,50,50,0.3)'
        },

        "&::-moz-placeholder": { /* Firefox 19+ */
            color: 'rgba(57,50,50,0.3)'

        },
        
        "&:-ms-input-placeholder": { /* IE 10+ */
            color: 'rgba(57,50,50,0.3)'

        },
        "&:-moz-placeholder": { /* Firefox 18- */
            color: 'rgba(57,50,50,0.3)'

        },
        "@media (max-width:960px)":{
               
        
            width:'100%',
        },
        
    },
    inputsContainer: {
        margin: '30px'
    },
    headertitle:{
        color: 'black',
        fontWeight:'bold',
        display:'flex',
        
        justifyContent:'center',
        marginRight:'40px',
        padding:'10px'

    },
    buttons:{
        display:'flex',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        gap:'50px',
        
    },
    buttonone:{
        
        paddingLeft: '40px', paddingRight: '40px', background: '#3293A8',paddingTop:'10px', paddingBottom:'10px',
        borderRadius: '5px', marginLeft: '15px', color: '#fff', textTransform: 'none',marginBottom:'15px',

        "@media (max-width:980px)":{
            
          
            padding:'13px',
            

        }, 
    },
    dropZone: {
        "& .MuiDropzoneArea-root": {
            background: '#EEEEEE',
            marginBottom: '30px',
            maxHeight: '343',
            width:'30rem',
            padding:'10px',
            borderRadius:'10px',

            border: '.5px solid #9e9e9e',
            "@media (max-width:735px)":{
               
             
                width:'22rem',
            },
            "@media (max-width:460px)":{
               
             
                width:'17rem',
            },

        },
    
        /*"& .MuiTypography-h5": {
            fontSize: '14px',
            fontWeight: 'normal'
        },
        "& .MuiDropzoneArea-text": {
            marginTop: '130px',
            color: '#9e9e9e'
        },
        "& .MuiSvgIcon-root": {
            display: 'flex',
            marginTop: '-100px',
            marginLeft: '110px',
            color: "#9e9e9e"
        }*/
    },
    imageleader:{
        width:'80%',
        },
    inputError: {
        color: 'red',
        fontSize: '13px',
        display: 'none',
        fontWeight:'normal'
    },
});
class NewListing extends React.Component {
    state = {
        location: '',
        bedRoom: '',
        monthlyPayment: '',
        floor: '',
        phoneNumber: '',
        guestHouse: false,
        description: '',
        squareMeter: '',
        availabilityDate:new Date(),
        errorMessage: '',
        isRedirectToHomepage: false,
        validity:false,
        guestHouse: false,
        file: null,

    };

    onFormSubmit = (e) => {
        e.preventDefault();

        this.validateForm(e);
    };
    listingStatusFilter = (e) => {
        if (e.currentTarget.value === "Pending") {
            return "Submitted"
        } else {
            return "Draft"
        }

    };
    validateForm = (e) => {

        const product = {

            location: this.state.location,
            bedRoom: parseInt(this.state.bedRoom),
            monthlyPayment: parseInt(this.state.monthlyPayment),
            floor: parseInt(this.state.floor),
            squareMeter: this.state.squareMeter,
            phoneNumber: parseInt(this.state.phoneNumber),
            guestHouse: this.state.guestHouse,
            description: this.state.description,
            availabilityDate: moment(this.state.availabilityDate).format("DD-MM-YYYY"),
            listingStatus: this.listingStatusFilter(e),
            reviewStatus: e.currentTarget.value

        };
        console.log('come 1 ');
        if (!this.state.location) {
            document.getElementById('locationError').style.display = 'block';
        }
        if (!this.state.floor) {
            document.getElementById('floorError').style.display = 'block';

        }
        if (!this.state.monthlyPayment) {
            document.getElementById('monthlyPaymentError').style.display = 'block';

        }
        if (!this.state.bedRoom) {
            document.getElementById('bedRoomError').style.display = 'block';

        }
        /*if (!this.state.guestHouse) {
            document.getElementById('guestHouseError').style.display = 'block';

        }*/
        if (!this.state.phoneNumber) {
            document.getElementById('phoneNumberError').style.display = 'block';

        }
        if (!this.state.availabilityDate) {
            document.getElementById('availabilityError').style.display = 'block';

        }

        // if (!this.state.file) {
        //     document.getElementById('dropZoneImage').style.display = 'block';
        // }

      

        if (this.state.location &&
            this.state.floor && this.state.monthlyPayment
            && this.state.bedRoom
            && this.state.phoneNumber) {
            this.setState({validity: true,})
            console.log('come 3 ');
            // pass the product as props
        } 
        if (this.state.file){
            console.log('here is')
            this.submitNewListingApiRequest(product);
        }
        else {
            //for not yet validated
            console.log('come 4 ');
          

        }


    };

    submitNewListingApiRequest = async (newLaunchDetails) => {
        /*let user = this.props.getToken();*/

        const formData = new FormData();
        this.state.file.forEach(fil => formData.append('files[]', fil));
        /*formData.append('files[]', this.state.file);*/
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(newLaunchDetails, 'what');
        let response = await backEndApi.post('/addhouse', {params: newLaunchDetails});
        let resImage = await backEndApi.post('/uploadHouseImage', formData, config);

        console.log("The files and Image success fully uploaded" + resImage + response);
        this.setState({isRedirectToHomepage: true,})

    };
    

    onLocationChanged = (e) => {
        if (e.target.value.length === 0) {
            document.getElementById('locationError').style.display = 'block';
        } else {
            document.getElementById('locationError').style.display = 'none';

        }
        this.setState({location: e.target.value});
        if (e.target.value !== 1) {
            this.setState({location: e.target.value})
        }
    };
    onDescriptionChanged = (e) => {

        this.setState({description: e.target.value})
    };
    onFloorchanged = (e) => {
        if (e.target.value === 'Select Floor') {
            document.getElementById('floorError').style.display = 'block';

        } else {
            document.getElementById('floorError').style.display = 'none';
        }
        this.setState({floor: e.target.value})
    };
    onMonthlyPaymentChanged = (e) => {
        if (e.target.value.length === 0) {
            document.getElementById('monthlyPaymentError').style.display = 'block';
        } else {
            document.getElementById('monthlyPaymentError').style.display = 'none';
        }

        this.setState({monthlyPayment: e.target.value})
    };
    onBedroomChanged = (e) => {
        if (e.target.value.length === 'Select Bed Rooms') {
            document.getElementById('bedRoomError').style.display = 'block';

        } else {
            document.getElementById('bedRoomError').style.display = 'none';

        }
        this.setState({bedRoom: e.target.value})
    };
    onPhoneNumberChanged = (e) => {

        if (e.target.value.length === 0) {
            document.getElementById('phoneNumberError').style.display = 'block';

        } else {
            document.getElementById('phoneNumberError').style.display = 'none';

        }


        this.setState({phoneNumber: e.target.value})


    };
    onAvailabilityChanged = (date) => {
        console.log(date, 'this is date')
        if (date === null) {
           
            document.getElementById('availabilityError').style.display = 'block';

        } else {
            document.getElementById('availabilityError').style.display = 'none';

        }

        this.setState({availabilityDate: date})
    };

    onSquareMeterChanged = (e) => {

        this.setState({squareMeter: e.target.value})
    };

     onDropZoneChange = (e) => {
        if (e[0]) {
            document.getElementById('dropZoneImage').style.display = 'none';

        }

        this.setState({file: e});

    };
    onGuestHouseChanged = (e) => {



        this.setState({guestHouse: e.target.value === 'yes'})
    };
  

    render() {
        const {classes} = this.props;

        if (!this.props.getToken()) {
            return <Redirect to='/login'/>
        }
        if (this.state.isRedirectToHomepage) {
            return <Redirect to='/dashboard'/>
        }
        if (this.state.validity) {
            return (
                <Container  maxWidth="md" >
                    <Container className={classes.root}>
                    
    
                    <Grid container className={classes.firstGrid} justifyContent='center'  spacing={1}>
                        <Grid item xs={12} md={12} justifyContent='center'>
                            <div>
                                <div  className={classes.headertitle}>
                                    <div className="subone">
                                        <img src={smallhouse} className={classes.imageleader} />
                                    </div>
                                    <div className="subtwo">
                                        <Typography variant='h6' style={{marginBottom: '30px', marginTop: '35px', }}>
                                               Add New House
                                        </Typography>
                                    </div>
                                  
                                </div >
                                <img src={mainpic}className={classes.addhouseimage} /> 
                                
                                
    
                            </div>
                        </Grid>
    
    
                        <Grid item xs={12} md={6}>
    
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2' className={classes.leadertitle} >Upload house image<span
                                    style={{opacity: '0.5', fontSize:'12px'}}>(maximum 6 images)</span>
                                </Typography>
    
                                <Grid style={{marginTop: '5px'}}>
                                    <Grid itme xs={12} md={8} className={classes.dropZone} id="upload" data-cy="content">
    
                                        {/*Icon ={}*/}
                                        <DropzoneArea
                                            acceptedFiles={['image/*']}
                                            maxFileSize={6000000}
                                            filesLimit={'6'}
                                            dropzoneText={"Drag and drop an image here or click"}
                                            onChange={this.onDropZoneChange}
                                        />
                                        {/*<DropzoneArea getPreviewIcon={this.handlePreviewIcon}
                                                      dropzoneText="Drag and drop a jpg, png or webp Icon, Or click to add"/>*/}
                                    </Grid>
                                    <Typography variant='body2' id='dropZoneImage' className={classes.inputError}>You have
                                        to
                                        upload an image.</Typography>
                                </Grid>
                            </div>
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2' className={classes.leadertitle}>is it Guest House</Typography>
                                <label htmlFor="guestYes" className={classes.options} style={{ background:'#3293A8',}}>Yes</label>
                                <input type="radio" value='yes' id='guestYes' name='guestRadio'
                                       placeholder='is it Guest House'
                                       onChange={this.onGuestHouseChanged}
    
                                />
                                <label htmlFor="guestNo" className={classes.options} style={{ background:'#E21E2A',marginLeft:'10px'}}>No</label>
    
                                <input type="radio" value='no' id='guestNo' name='guestRadio'
                                       onChange={this.onGuestHouseChanged}
                                />
                                <Typography variant='body2' id='guestHouseError' className={classes.inputError}>You have
                                    specific if it is guesthouse.</Typography>
    
    
                            </div>
    
                            <div className={classes.inputsContainer}>
                                <TextField
                                    id="outlined-multiline-static"
                                    name="short Description" className={classes.textarea}
                                    label="Short Description"
                                    placeholder="short Description about the house"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={this.state.description}
                                    style={{marginTop: '5px',}} onChange={this.onDescriptionChanged}
                                />
    
                            </div>
    
                            <br/><br/>
                            <div  className={classes.buttons}>
                                <Button onClick={this.onFormSubmit} value='NA' variant='contained'className={classes.buttonone}>Save As Draft</Button>
    
                                <Button id="submit" onClick={this.onFormSubmit} value='Pending' variant='contained'className={classes.buttonone}> Submit For Review</Button>
                                
                            </div>
                            <br/><br/>
                        </Grid>
                        
                    </Grid>
    
                </Container>
                </Container>
            );
        }
        return (
            <Container >
                <Container className={classes.root} maxWidth='md'>
                

                <Grid container className={classes.firstGrid} alignItems='center' justifyContent='center' spacing={1} >
                    <Grid item xs={12} md={6} alignItems='center' justifyContent='center'>
                        <form  >

                            <div className={classes.headertitle}>
                                <div className="subone">
                                    <img src={smallhouse} alt=""  className={classes.imageleader}/>
                                </div>
                                <div className="subtwo">
                                     <Typography variant='h5' style={{marginBottom: '30px', marginTop: '35px', marginLeft: '-15px'}}>New
                                        House</Typography>
                                </div>

                                <Link to='/addtwohouse'></Link>
                               
                                

                            </div>
                            <img src={mainpic}  className={classes.addhouseimage} alt="" />
                            <div  className={classes.inputsContainer}>
                                    


                                <input type="text" list='locationOfCondominium' id="location" name='Myname'
                                       
                                       className='form__input'
                                       placeholder='Location of condominium'
                                       onChange={this.onLocationChanged}
                                       value={this.state.location}
                                />
                                <div className="form__label">
                                    <label htmlFor="location" className='form__labels'>Location</label>
                                </div>
                                
                                <datalist id="locationOfCondominium">
                                    <option value="Ayat Condominium"/>
                                    <option value="Yeka Abado Condominium"/>
                                    <option value="Submit Condominium"/>
                                    <option value="Gelan Condominium"/>
                                    <option value="Tuludimtu Condominium"/>
                                    <option value="4 killo Condominium"/>
                                    <option value="Gotera Condominium"/>
                                    <option value="Balderas Condominium"/>
                                    <option value="Mebrathail Condominium"/>
                                </datalist>
                                <Typography variant='body2' id='locationError' className={classes.inputError}>You have
                                    to entered Location of your condominium.</Typography>

                            </div>
                            <div className={classes.inputsContainer}>
                                <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"  >Bedroom</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            sx={{height:42}}
                                            label="Bedroom"
                                            onChange={this.onBedroomChanged}
                                            name="selectNumberOfBedrooms"
                                        >
                                            <MenuItem value='1'>0 (studio)</MenuItem>
                                            <MenuItem value='1'>1</MenuItem>
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                        </Select>
                                </FormControl>
                                <Typography type='number' variant='body2' id='bedRoomError'
                                            className={classes.inputError}>You have
                                    to enter number of bed rooms.</Typography>

                            </div>
                            <div className={classes.inputsContainer}>
                                <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"  >Select Floor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            sx={{height:42}}
                                            label="Select Floor"
                                            onChange={this.onFloorchanged}
                                            name="selectNumberOfBedrooms"
                                        >
                                            <MenuItem value='0'>ground</MenuItem>
                                            <MenuItem value='1'>+1</MenuItem>
                                            <MenuItem value="2">+2</MenuItem>
                                            <MenuItem value="3">+3</MenuItem>
                                            <MenuItem value="4">+4</MenuItem>
                                            <MenuItem value="5">+5</MenuItem>
                                            <MenuItem value="6">+6</MenuItem>
                                            <MenuItem value="7">+7</MenuItem>
                                            <MenuItem value="8">+8</MenuItem>
                                            <MenuItem value="9">+9</MenuItem>
                                        </Select>
                                </FormControl>
                                <Typography variant='body2' id='floorError' className={classes.inputError}>you have
                                    to
                                    select floor.</Typography>
                            </div>
                            
                            <div className={classes.inputsContainer}>
                                <TextField
                                    label="Monthly payment"
                                   
                                    className={classes.input}
                                    onChange={this.onMonthlyPaymentChanged}
                                    value={this.state.monthlyPayment}
                                    placeholder='eg, 5000'
                                    
                                    
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><span><i class='fas fa-dollar-sign'></i></span></InputAdornment>,
                                        className: classes.input
                                    }}
                                />
                                <Typography variant='body2' id='monthlyPaymentError' className={classes.inputError}>you
                                    have to
                                    enter monthly payment.</Typography>

                            </div>
                            <div className={classes.inputsContainer}>
                                    <input name="SquareMeter" type="text" list='squareMetersInput'
                                    placeholder='Square meter of your house' className='form__input'
                                    onChange={this.onSquareMeterChanged}
                                    value={this.state.squareMeter}

                                    />
                                    <datalist id='squareMetersInput'>
                                        <option value="4 x 4"></option>
                                        <option value="3 x 4"></option>
                                        <option value="5 x 4"></option>
                                        <option value="5 x 3"></option>
                                    </datalist>
                                    <div className="form__label">
                                        <label htmlFor="location" className='form__labelss'>Square meters <span
                                        style={{opacity: '0.5'}}>(optional)</span></label>
                                    </div>

                            </div>
                            <div className={classes.inputsContainer}>
                                    <div className={classes.dataPicker} id="date">
                                        <DatePicker
                                           
                                            name="date"
                                            dateFormat="dd-MM-yyyy"
                                            selected={this.state.productLaunchDate}
                                            className='form__input'
                                            onChange={this.onAvailabilityChanged}
                                            value={moment(this.state.availabilityDate).format("DD-MM-YYYY")}
                                        />
                                        <div className="form__label">
                                        <label htmlFor="location" className='form__labelss'>Available date start from</label>
                                </div>
                                    </div>
                                <Typography variant='body2' id='availabilityError' className={classes.inputError}>You
                                    have
                                    to
                                    Set Launch Data.</Typography>
                            </div>
                            <div className={classes.inputsContainer}>
                                    <TextField
                                        label="Phone number"
                                        name="phone" className={classes.input}
                                        onChange={this.onPhoneNumberChanged}
                                        value={this.state.phoneNumber}
                                        placeholder='eg, 925762589'
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">+251</InputAdornment>,
                                            className: classes.input
                                        }}
                                    />

                                <Typography variant='body2' id='phoneNumberError' className={classes.inputError}>You
                                    have
                                    to enter your phone number.</Typography>

                            </div>


                            <div  className={classes.buttons}>
                                <br/><br/>
                                <Button id="submit" onClick={this.onFormSubmit} value='Pending' variant='contained'className={classes.buttonone} > Next</Button>
                                <br/><br/>
                            </div>

                        </form>
                    </Grid>
                    

                </Grid>

            </Container>
            </Container>
        );
    }

}

export default withStyles(useStyles)(NewListing);


