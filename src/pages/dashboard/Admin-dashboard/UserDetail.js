import React, {useEffect, useState} from 'react'
import './style.css'
import backEndApi from "../../../services/api";
import {Box, withStyles} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import MyModal from './Modal';
import { Redirect, useHistory} from "react-router-dom";

const useStyles = theme => ({
    root: {
        display:'flex',
        flexWrap:'warp',
        flexDirection:'row',
        justifyContent:'space-around',
        gap:'20px',
        marginTop: '20px',
        [theme.breakpoints.down('sm')]: {
            flexDirection:'column'
        },
        '& span': {fontSize:'clamp(0.8rem, -0.075rem + 1.533vw, 1.2rem)'},

        '& th':{
            fontSize:'clamp(0.7rem, -0.075rem + 1.533vw, 1rem)',
        },
    },
    tableContainer: {
        display:'flex',
        width:'70%',
        justifyContent:'space-around',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#eeeeee',
    },
    submittedDateF: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
});

function UserDetail(props) {
    const history = useHistory();
    const [houses, setHouses] = useState([])
    const [isReRender, setIsReRender] =  useState(false)
    const [isRedirect, setIsRedirect] =  useState(false)
    const [redirectTo, setRedirectTo] =  useState('')

    useEffect(() => {
        const getData = async () => {
            const config = { headers: {'x-access-token': JSON.parse(localStorage.getItem('token')).token}};
            const response = await backEndApi.get(`/houses/${props.match.params.id}`, config);
            setHouses(response.data.houses)
        }
        getData();
    }, [props.match.params.id]);

    const reRender = (isReRender) => {
        setIsReRender(isReRender)
    };

    const ReviewStatusFilter = (status) => {
        switch (status) {

            case 'Approved' :
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(58,99,81,0.2)',
                        padding: '5px',
                        paddingRight: '40px',
                        paddingLeft: '40px'
                    }}>Approved</span>;
            case 'Pending' :
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(243,251,96,0.28)',
                        padding: '5px 25px',

                    }}>Pending</span>;
            case 'Rejected':
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(223,6,18,0.36)',
                        padding: '5px',
                        paddingRight: '20px',
                        paddingLeft: '20px'
                    }}>Rejected
                </span>
            default:
                return <div>Something occur</div>
        }

    };

    const onTableRowClick = (row) =>{
        console.log(row._id);
        setIsRedirect(true)
        setRedirectTo(row._id)
    };
    const {classes} = props;

    const onNavigate = (e) => {
        e.preventDefault();
        history.push('/userlist')
    };

    if(isRedirect){
        return  <Redirect to={`/adminDetail/${redirectTo}`} />
    }

    return (
        <div  className={classes.root} spacing={4}>
        <div  style={{width:'100%'}} >
            <div>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                    <div style={{alignSelf:'center'}}>
                        <span onClick={onNavigate} style={{marginRight:'20px',fontSize:'1.2em', color:'#2a5029', cursor:'pointer'}}> {'< Back'}  </span>
                        <span style={{marginBottom:'20px'}}>{houses[0] ? houses[0].ownerEmail : 'User house list'}</span>
                    </div>
                </div>
                <Box>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow id="userInfo">
                                <TableCell>
                                    <span >Location</span>
                                </TableCell>
                                <TableCell>
                                    <span >Submitted Date</span>
                                </TableCell>
                                <TableCell style={{textAlign:'center'}} className={classes.submittedDateF} >
                                    <span >Review status</span>
                                </TableCell>
                                <TableCell style={{textAlign:'center'}}  >
                                    <span
                                     >Action</span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {houses?
                                houses.map((row) => (
                                    <TableRow key={row._id} onClick={()=>onTableRowClick(row)}  style={{cursor:'pointer'}}>
                                        <TableCell component="th" scope="row" style={{ width:'15%'}}>
                                            {row.location}
                                        </TableCell>
                                        <TableCell component="th" scope="row" style={{ width:'15%'}} className={classes.submittedDateF}>
                                        {moment(row.dateCreated).format("D/M/yyyy")}
                                        </TableCell>

                                        <TableCell style={{textAlign:'center', width:'20%'}}>
                                            {ReviewStatusFilter(row.reviewStatus)}
                                        </TableCell>
                                        <TableCell style={{textAlign:'center',width:'10%'}}>
                                            <div>
                                                <MyModal docs={row} reRender={reRender}/>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )):""}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
            </div>
        </div>
    </div>
    );
}

export default withStyles(useStyles)(UserDetail);
