import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Popover,
  Divider,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from "@material-ui/core";

import { Link } from "react-router-dom";



// import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import backEndApi from "../../../services/api";
import AccountInfo from "./AccountInfo";
import Loader from "./Loader";
import ViewLaunchOnHover from "./ViewLaunchOnHover";
import ReviewStatusFilter from "../ReviewStatusFilter";
import { Pagination } from "@mui/material";

import useStyles from "./UserStyle";
import ListingStatusFilter from "./ListingStatusFilter";
import usePagination from "../Pagination";

function UserDashboard(props) {
  const [state, setState] = useState({
    homeDocs: [],
    userDetail: "",
    isSwitchOn: false,
    isHovering: false,
    hoveredLaunch: "",
    page: 1,
    perPage: 2,
    totalNumber: 0,
  });

  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(state.totalNumber / PER_PAGE);
  let _DATA = usePagination(state.homeDocs, state.totalNumber, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const classes = useStyles();

  useEffect(() => {
    setState({
      homeDocs: props.data.homeDocs,
      userDetail: props.data.docs,
      totalNumber: props.data.count,
    });
  }, []);

  useEffect(() => {
    setState({
      homeDocs: props.data.homeDocs,
      totalNumber: props.data.count,
      userDetail: props.data.docs,
    });
  }, [props.data]);

  if (!state.homeDocs) {
    /*window.location.reload()*/
  }

  const onSwitchChange = async (e) => {
    const response = await backEndApi.post("/activateButton", {
      params: {
        isActive: e.target.checked,
        id: e.target.name,
      },
    });
    console.log(response.data);
    window.location.reload(false);
    if (response.data === "Active") {
      /* document.getElementById(nameTag).innerText = 'Active';
             document.getElementById(switchId).checked = true;

             this.setState({isSwitchOn: true});*/
    } else if (response.data === "Inactive") {
      /*document.getElementById(nameTag).innerText = 'Inactive';
            document.getElementById(switchId).checked = false;

            this.setState({isSwitchOn:false})*/
    } else {
      alert("Unhandled Conditions");
    }
  };
  const switchChecked = (row) => {
    return row.listingStatus === "Active";
  };

  const productRow = () =>
    state.homeDocs ? (
      _DATA.currentData().map((row) => (
        <Grid container spacing={2} className={classes.tableRow} key={row._id}>
          <Grid item xs={4} className={classes.gridElement}>
            {row.location}
          </Grid>
            

          <Grid
            item
            xs={3}
            className={classes.gridElement}
            style={{
              textAlign: "center",
            }}
            // className={classes.listingStatusF}
          >
            {ListingStatusFilter(row.listingStatus, row._id)}
          </Grid>
            <br />

          <Grid
            item
            xs={3}
            className={classes.gridElement}
            style={{
              textAlign: "center",
            }}
          >
            {ReviewStatusFilter(row.reviewStatus)}
          </Grid>

          <br />
          <Grid
            item
            xs={2}
            className={classes.gridElement}
            style={
              {
                // paddingLeft: "3rem",
              }
            }
          >
            <IconButton
              aria-label="delete"
              className={classes.iconBackgroundRed}
              style={{
                padding: "5px",
                margin: "5px",
                fontSize: "15px",
                borderRadius: "4px",
                height: "100% ",
              }}
              size="large"
              // href={"/editHouse/" + row._id}
            > 

              <i 
              class="fas fa-home" 
              onClick={handleClick}
                fontSize="inherit"
               
              ></i>
              
              <Popover
                anchorOrigin={{
                  vertical: "0",
                  horizontal: "20",
                }}
                style={{
                  position: "absolute",
                  marginTop: "-2.25rem",
                }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
              >
                <div
                  style={{
                    width: "12rem",
                    // height: "10rem",
                    padding: "1rem 0 0rem",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: ".5rem 0",
                      color: "#9FA2B4",
                      fontSize: "16px",
                    }}
                  >
                    Action
                  </div>
                  <Divider />

                  <Link
                    style={{
                      textDecoration: "none",
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9FA2B4",
                      fontSize: "14px",
                    }}
                    to={`editHouse/${row._id}`}
                  >
                    <Button
                      style={{
                        border: "none",
                        width: "100%",
                      }}
                      id="addNewHouse"
                      // href={"/dashboard"}
                      variant="outlined"
                      className={classes.popover}
                      startIcon={
                        <i class="fas fa-home" style={{fontSize:'20px'}}></i>
                      }
                    >
                      Edit
                    </Button>
                  </Link>

                  <Divider />
                  <Link
                    style={{
                      textDecoration: "none",
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: ".5rem 0",
                      color: "#9FA2B4",
                      fontSize: "14px",
                    }}
                    // to={`editHouse/${row._id}`}
                  >
                    <Button
                      id="addNewHouse"
                      // href={"/dashboard"}
                      variant="outlined"
                      className={classes.popover}
                      style={{
                        border: "none",
                        width: "100%",
                      }}
                      startIcon={
                        <i class="fas fa-home" style={{fontSize:'20px'}}></i>
                      }
                    >
                      Delete
                    </Button>
                  </Link>
                </div>
              </Popover>
            </IconButton>
            <span style={{ position: "relative", top: "auto", zIndex: 9 }}>
              <span
                style={{
                  position: "absolute",
                  right: "100%",
                  width: "600px",
                  height: "20px",
                }}
              >
                {state.isHovering && state.hoveredLaunch === row._id ? (
                  <ViewLaunchOnHover row={row} />
                ) : (
                  ""
                )}
              </span>
            </span>
          </Grid>
        </Grid>
      ))
    ) : (
      <Loader />
    );

  return (
    <Grid
      container
      className={classes.root}
      spacing={1}
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <Grid xs={12} md={8} lg={9} xl={9}>
        <Box>
          <Grid container style={{ marginBottom: "20px" }}>
            <Grid item xs={4} md={3} sm={5}>
              <div style={{ alignSelf: "center" }}>
                <span
                  style={{
                    marginBottom: "20px",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  List of Houses
                </span>
              </div>{" "}
            </Grid>
            <Grid item xs={3} sm={3} md={5}></Grid>
            <Grid item xs={5} md={4} sm={4} align="right">
              <Link style={{ textDecoration: "none" }} to={`addhouse`}>
                <Button
                  id="addNewHouse"
                  variant="outlined"
                  className={classes.heroBtn}
                  style={{
                    backgroundColor: "#D5D7DF",
                    borderRadius: "15px",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                  startIcon={
                    <i class="fas fa-home" style={{fontSize:'20px'}}></i>
                  }
                >
                  Add new house
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              className={classes.tableHeader}
              style={{ border: "1.5px solid #3293A8" }}
            >
              <Grid item xs={4} className={classes.gridHeader}>
                Location
              </Grid>
              <Grid
                item
                xs={3}
                className={classes.gridHeader}
                style={{
                  textAlign: "center",
                }}
              >
                Listing Status
              </Grid>
              <Grid
                item
                xs={3}
                className={classes.gridHeader}
                style={{
                  textAlign: "center",
                }}
              >
                Review status
              </Grid>
              <Grid
                item
                xs={2}
                className={classes.gridHeader}
                style={{
                  paddingLeft: "0rem",
                  verticalAlign: "baseline",
                  // textAlign: "center",
                }}
              >
                Action
              </Grid>
            </Grid>
            <>{productRow()}</>
            {state.totalNumber > 5 ? (
              <Pagination
                count={count}
                size="large"
                page={page}
                onChange={handleChange}
                className={classes.paginationStyle}
                variant="outlined"
                color="primary"
              />
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6} md={3} lg={2} xl={2}>
        <AccountInfo userDetail={state.userDetail} />
      </Grid>
    </Grid>
  );
}

export default UserDashboard;
