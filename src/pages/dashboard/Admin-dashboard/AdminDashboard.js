import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  withStyles,
  Grid,
  styled,
  makeStyles,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import backEndApi from "../../../services/api";
import MyModal from "./Modal";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Redirect } from "react-router-dom";
import usePagination from "./Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "warp",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: "20px",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    "& span": { fontSize: "clamp(0.8rem, -0.075rem + 1.533vw, 1.2rem)" },

    "& th": {
      fontSize: "clamp(0.7rem, -0.075rem + 1.533vw, 1rem)",
    },
  },
  table: {},
  tableContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#eeeeee",
  },
  tableHeader: {
    marginTop: "1rem",
  },
  tableRow: {
    cursor: "pointer",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    margin: "20px 0",
    // height: "83px",
    borderRadius: "10px",
    "&:hover": {
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 10px 0px",
      backgroundColor: "#EEEEEE",
      marginLeft: ".5rem",
      transition: "ease-in-out .75s",
    },
  },
  tableCell: {
    borderBottom: "none",
    color: "#9FA2B4",
    fontSize: "18px",
    fontWeight: "bold",
    //   display: "flex",
    paddingTop: "1.25rem",
    padding: 0,
  },
  paginationStyle: {
    backgroundColor: "#F7F7F7",
    width: "55%",
    float: "right",
    padding: "20px 50px",
    margin: "0",
    display: "flex",
    justifyContent: "center",
    border: "1px solid #62F4DA",
    [theme.breakpoints.down("md")]: {
      width: "75%",
      padding: "10px 10px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "68%",
      padding: "10px 10px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: "10px 10px",
    },
  },
  margin: {
    margin: "5px",
    fontSize: "15px",
    borderRadius: "4px",
    "&:hover": { backgroundColor: "#3A6351" },
  },
  iconBackgroundRed: {
    backgroundColor: "rgba(228,130,87,0.21)",
  },
  deleteIcon: {
    color: "#F24545",
  },
  editIcon: {
    color: "#E48257",
  },
  iconBackgroundBlack: {
    backgroundColor: "rgba(57,50,50,0.2)",
  },
  formControlLabel: {
    marginTop: "8px",
    marginBottom: "8px",
    display: "flex",
    padding: "5px 0",
    justifyContent: "space-between",
    "& span": {},

    "& svg": {
      boxSizing: "border-box",
      borderRadius: "0px",
    },
    "& .MuiRadio-colorPrimary.Mui-checked": {
      color: "rgb(90,109,255)",
    },
    "& .MuiRadio-root": {
      color: "#747474",
    },
  },
  formControlCustom: {
    marginTop: "5px",
  },
  allLaunchesLabel: {
    border: "0.5px solid rgba(228, 130, 87, 0.3)",
    borderRadius: "5px",
  },
  myCheckbox: {
    marginLeft: "125px",
    width: "22px",
    height: "22px",
    boxSizing: "border-box",
    borderRadius: "4px",

    "& .Mui-checked": {
      border: "0px solid #393232",
    },
  },

  submittedDateF: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  listingFilters: {
    minWidth: "320px",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "300px",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "200px",
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
}));

function AdminDashboard() {
  const [state, setState] = useState({
    homeDocs: [],
    isReRender: false,
    filterSelected: "",
    isRedirect: false,
    redirectTo: "",
    page: 1,
    perPage: 2,
    totalNumber: 0,
  });
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(state.totalNumber / PER_PAGE);
  const _DATA = usePagination(state.homeDocs, state.totalNumber, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const classes = useStyles();

  useEffect(() => {
    const config = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("token")).token,
      },
    };

    const fetchData = async () => {
      const response = await backEndApi.get("/dashboard", config);
      setState({
        homeDocs: response.data.homeDocs,
      });
    };
    fetchData();
  }, []);

  const onRadioGroupChange = async (e) => {
    console.log(e.target.value);
    setState({ filterSelected: e.target.value });
    const config = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("token")).token,
      },
      params: { filter: e.target.value },
    };
    const response = await backEndApi.get("/dashboard", config);
    setState({
      homeDocs: response.data.homeDocs,
      totalNumber: response.data.count,
    });
    console.log(response.data, "wefwrgewfwni");
  };
  const ReviewStatusFilter = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span
            style={{
              textTransform: "none",
              borderRadius: "12.5px",
              backgroundColor: "#89E472",
              padding: "7px 25px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Approved
          </span>
        );
      case "Pending":
        return (
          <span
            style={{
              textTransform: "none",
              borderRadius: "12.5px",
              backgroundColor: "#FFCC48",
              padding: "7px 25px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span
            style={{
              textTransform: "none",
              borderRadius: "12.5px",
              backgroundColor: "rgba(236, 67, 67,0.66)",
              padding: "7px 25px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Rejected
          </span>
        );
      default:
        return <div>Something occur</div>;
    }
  };
  const reRender = (isReRender) => {
    setState({ isReRender: isReRender });
  };
  const onTableRowClick = (row) => {
    console.log(row._id);
    setState({ isRedirect: true, redirectTo: row._id });
  };

  if (state.isRedirect) {
    return <Redirect to={`/adminDetail/${state.redirectTo}`} />;
  }
  if (state.isReRender) {
    window.location.reload(false);
  }

  return (
    <Grid className={classes.root} spacing={1}>
      <Grid item xs={12} md={7} lg={8} xl={9}>
        <div style={{ width: "100%" }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div style={{ alignSelf: "center" }}>
                <span
                  style={{
                    marginBottom: "20px",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  List of Houses
                </span>
              </div>
              <div>
                <Button
                  id="addNewHouse"
                  href="/addhouse"
                  variant="outlined"
                  style={{
                    backgroundColor: "#D5D7DF",
                    borderRadius: "15px",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                  startIcon={
                    <AddCircleOutlinedIcon
                      style={{ color: "#58D1BB", fontSize: "2rem" }}
                    />
                  }
                >
                  Add new house
                </Button>
              </div>
            </div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={2}
                className={classes.tableHeader}
                style={{ border: "1.5px solid #3293A8" }}
              >
                <Grid item xs={4}>
                  <Item
                    style={{
                      borderBottom: "none",
                      color: "#9FA2B4",
                      fontSize: "18px",
                      fontWeight: "bold",
                      paddingTop: "1.25rem",
                    }}
                  >
                    Location
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item
                    style={{
                      borderBottom: "none",
                      color: "#9FA2B4",
                      fontSize: "18px",
                      fontWeight: "bold",
                      paddingTop: "1.25rem",
                      textAlign: "center",
                    }}
                  >
                    Submitted Date
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item
                    style={{
                      borderBottom: "none",
                      color: "#9FA2B4",
                      fontSize: "18px",
                      fontWeight: "bold",
                      paddingTop: "1.25rem",
                      textAlign: "center",
                    }}
                  >
                    Review status
                  </Item>
                </Grid>
              </Grid>
              {state.homeDocs
                ? _DATA.currentData().map((row) => (
                    <Grid
                      container
                      spacing={2}
                      onClick={() => onTableRowClick(row)}
                      className={classes.tableRow}
                    >
                      <Grid item xs={4}>
                        <Item
                          style={{
                            borderBottom: "none",
                            color: "#252733",
                            fontSize: "18px",
                            fontWeight: "bold",
                            paddingTop: "1.25rem",
                            backgroundColor: "transparent",
                          }}
                        >
                          {row.location}
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item
                          style={{
                            borderBottom: "none",
                            color: "#252733",
                            fontSize: "18px",
                            fontWeight: "bold",
                            paddingTop: "1.25rem",
                            textAlign: "center",
                            backgroundColor: "transparent",
                          }}
                        >
                          {moment(row.dateCreated).format("D/M/yyyy")}{" "}
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item
                          style={{
                            borderBottom: "none",
                            color: "#252733",
                            fontSize: "18px",
                            fontWeight: "bold",
                            paddingTop: "1.25rem",
                            textAlign: "center",
                            backgroundColor: "transparent",
                          }}
                        >
                          {ReviewStatusFilter(row.reviewStatus)}
                        </Item>
                      </Grid>
                    </Grid>
                  ))
                : ""}
              <Pagination
                count={count}
                size="large"
                page={page}
                onChange={handleChange}
                className={classes.paginationStyle}
                variant="outlined"
                color="primary"
              />
            </Box>
          </div>
        </div>
      </Grid>
      <Grid item xs={6} md={4} lg={3} xl={2}>
        <div className={classes.listingFilters}>
          <div>
            <div item>
              <span style={{ marginBottom: "9px" }}> Listing Filters</span>
            </div>
          </div>
          <div
            style={{
              marginTop: "10px",
              backgroundColor: "#eeeeee",
              boxShadow: "-9px 9px 16px rgba(0, 0, 0, 0.05)",
              borderRadius: "5px",
            }}
          >
            <div>
              <FormControl
                required
                component="fieldset"
                className={classes.formControlCustom}
              >
                <RadioGroup
                  aria-label="filter"
                  name="Listing"
                  onChange={onRadioGroupChange}
                >
                  {/*<FormControlLabel
                                      control={<Radio name="Construction" color='primary'
                                                      className={classes.myCheckbox}/>}

                                      value="Sort by name"
                                      label="Sort by name"
                                      labelPlacement='start'
                                      className={classes.formControlLabel}


                                  />*/}

                  <FormControlLabel
                    id="AllStatus"
                    control={
                      <Radio
                        name="Construction"
                        color="primary"
                        className={classes.myCheckbox}
                      />
                    }
                    value="All Status"
                    label="All Status"
                    labelPlacement="start"
                    className={classes.formControlLabel}
                  />

                  <FormControlLabel
                    id="Pending"
                    control={
                      <Radio
                        name="Construction"
                        color="primary"
                        className={classes.myCheckbox}
                      />
                    }
                    value="Pending"
                    label="Pending Review"
                    labelPlacement="start"
                    className={classes.formControlLabel}
                  />
                  <FormControlLabel
                    id="Rejected"
                    control={
                      <Radio
                        name="Construction"
                        color="primary"
                        className={classes.myCheckbox}
                      />
                    }
                    value="Rejected"
                    label="Rejected"
                    labelPlacement="start"
                    className={classes.formControlLabel}
                  />

                  <FormControlLabel
                    id="Approved"
                    control={
                      <Radio
                        name="Construction"
                        color="primary"
                        className={classes.myCheckbox}
                      />
                    }
                    value="Approved"
                    label="Approved"
                    labelPlacement="start"
                    className={classes.formControlLabel}
                  />

                  <FormControlLabel
                    control={
                      <Radio
                        name="Construction"
                        color="primary"
                        className={classes.myCheckbox}
                        id="SortByDate"
                      />
                    }
                    value="Sort by date"
                    label="Sort by date"
                    labelPlacement="start"
                    className={classes.formControlLabel}
                  />
                </RadioGroup>
                {/*<Box mt={4}>
                                      <Typography align='center'>
                                          <Button style={{textTransform: 'none',}}>See More</Button>
                                      </Typography></Box>*/}
              </FormControl>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
