import React from "react";
import { Box, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import backEndApi from "../../../services/api";
import MyModal from "./Modal";
import { Redirect } from "react-router-dom";

const useStyles = (theme) => ({
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
  tableContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#eeeeee",
  },
  submittedDateF: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
});

class UserList extends React.Component {
  state = { users: [], isReRender: false, isRedirect: false, redirectTo: "" };
  componentDidMount = async () => {
    const config = {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("token")).token,
      },
    };
    const response = await backEndApi.get("/users", config);
    this.setState({
      users: response.data.users,
    });
  };

  reRender = (isReRender) => {
    this.setState({ isReRender: isReRender });
  };
  onTableRowClick = (row) => {
    this.setState({ isRedirect: true, redirectTo: row._id });
  };
  render() {
    const { classes } = this.props;
    if (this.state.isRedirect) {
      return <Redirect to={`/userDetail/${this.state.redirectTo}`} />;
    }
    if (this.state.isReRender) {
      window.location.reload(false);
    }
    return (
      <div className={classes.root} spacing={4}>
        <div style={{ width: "70%" }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div style={{ alignSelf: "center" }}>
                <span style={{ marginBottom: "20px" }}>All Users</span>
              </div>
            </div>
            <Box>
              <TableContainer
                component={Paper}
                className={classes.tableContainer}
              >
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow id="userInfo">
                      <TableCell>
                        <span>Name</span>
                      </TableCell>
                      <TableCell>
                        <span>Email</span>
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className={classes.submittedDateF}
                      >
                        <span>Registered Date</span>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <span>Action</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.users
                      ? this.state.users.map((row) => (
                          <TableRow
                            key={row._id}
                            onClick={() => this.onTableRowClick(row)}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{ width: "15%" }}
                            >
                              {row.name}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              style={{ width: "15%" }}
                            >
                              {row.email}
                            </TableCell>

                            <TableCell
                              style={{ textAlign: "center", width: "20%" }}
                              className={classes.submittedDateF}
                            >
                              {moment(row.dateCreated).format("D/M/yyyy")}
                            </TableCell>
                            <TableCell
                              style={{ textAlign: "center", width: "10%" }}
                            >
                              <div>
                                <MyModal docs={row} reRender={this.reRender} />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      : ""}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(UserList);
