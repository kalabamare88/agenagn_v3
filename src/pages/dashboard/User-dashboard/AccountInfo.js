import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import backEndApi from "../../../services/api";
import useStyles from "./UserStyle";

function AccountInfo(props) {
  const onAddCreditClicked = async () => {
    await backEndApi.post("./addCredit", { id: props.userDetail._id });
    window.location.reload(false);
  };

  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item md={6} style={{ marginBottom: "5px" }}>
          <Typography
            variant="h6"
            style={{
              display: "inline",
              fontWeight: "bold",
            }}
          >
            {" "}
            Account-Info
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.accountInfoHolder}>
        <div>
          <div
            className={classes.accountNameHolder}
            style={{
              //   marginBottom: "20px",
              //   marginLeft: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <PersonIcon className={classes.personIcon} />

            <Typography variant="h6" className={classes.textName}>
              {props.userDetail.name}
            </Typography>
          </div>
          <div
            style={{
              marginBottom: "20px",
              marginLeft: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <EmailIcon className={classes.emailIcon} />

            <Typography variant="h6" className={classes.textEmail}>
              {props.userDetail.email}
            </Typography>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default AccountInfo;
