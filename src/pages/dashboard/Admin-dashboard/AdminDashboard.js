import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  styled,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import moment from "moment";
import backEndApi from "../../../services/api";
import { Pagination } from "@mui/material";

// import fas-fa home from "@mui/icons-material/AddCircleOutlined";
import { Redirect, Link } from "react-router-dom";
import usePagination from "../Pagination";
import useStyles from "./AdminStyle";
import ReviewStatusFilter from "../ReviewStatusFilter";
import AdminDrawer from "../../../components/AdminDrawer";
import { useSelector } from "react-redux";

function AdminDashboard(props) {
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

  props.setSideBar(true);

  const { isSuccess } = useSelector((state) => state.dashboard);

  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  props.setSideBar(true);

  const count = Math.ceil(state.totalNumber / PER_PAGE);
  let _DATA = usePagination(state.homeDocs, state.totalNumber, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const classes = useStyles();

  useEffect(() => {
    setState({
      homeDocs: props.data.homeDocs,
      totalNumber: props.data.count,
    });
  }, []);

  useEffect(() => {
    setState({
      homeDocs: props.data.homeDocs,
      totalNumber: props.data.count,
    });
  }, [props.data]);

  const onRadioGroupChange = (e) => {
    props.onRadioGroupChange(e.target.value);

    // setState({
    //   homeDocs: props.data.homeDocs,
    //   totalNumber: props.data.count,
    // });
  };

  const reRender = (isReRender) => {
    setState({ isReRender: isReRender });
  };
  const onTableRowClick = (row) => {
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
      <Grid item xs={12} md={2} lg={1} xl={2}>
        {/* <Grid item xs={12} md={2} lg={1} xl={2}>
          <div style={{ display: "flex" }}>
            {isSuccess ? props.data.auth == "Admin" ? <AdminDrawer /> : "" : ""}
            <h3 style={{ fontSize: "30px", margin: 0, color: "black" }}></h3>
          </div>
        </Grid> */}
      </Grid>
      <Grid item xs={12} md={7} lg={7} xl={6}>
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
                <Link style={{ textDecoration: "none" }} to={`addhouse`}>
                  <Button
                    id="addNewHouse"
                    variant="outlined"
                    style={{
                      backgroundColor: "#D5D7DF",
                      borderRadius: "15px",
                      border: "none",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    startIcon={
                      <fas-fa home
                        style={{ color: "#58D1BB", fontSize: "2rem" }}
                      />
                    }
                  >
                    Add new house
                  </Button>
                </Link>
              </div>
            </div>
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
                  xs={4}
                  className={classes.gridHeader}
                  style={{
                    textAlign: "center",
                  }}
                >
                  Submitted Date
                </Grid>
                <Grid
                  item
                  xs={4}
                  className={classes.gridHeader}
                  style={{
                    textAlign: "center",
                  }}
                >
                  Review status
                </Grid>
              </Grid>
              {state.homeDocs
                ? _DATA.currentData().map((row) => (
                    <Grid
                      container
                      spacing={2}
                      onClick={() => onTableRowClick(row)}
                      className={classes.tableRow}
                      key={row._id}
                    >
                      <Grid item xs={4} className={classes.gridElement}>
                        {row.location}
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        className={classes.gridElement}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {moment(row.dateCreated).format("D/M/yyyy")}{" "}
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        className={classes.gridElement}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {ReviewStatusFilter(row.reviewStatus)}
                      </Grid>
                    </Grid>
                  ))
                : ""}
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
          </div>
        </div>
      </Grid>
      <Grid item xs={6} md={4} lg={2} xl={2}>
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
              </FormControl>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
