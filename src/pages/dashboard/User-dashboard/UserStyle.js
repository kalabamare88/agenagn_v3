import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
  },
  tableHeader: {
    marginTop: "1rem",
    marginLeft: ".1rem",
  },
  gridHeader: {
    borderBottom: "none",
    color: "#9FA2B4",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: ".5rem",
  },
  tableRow: {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    margin: "0",
    padding: "0",
    margin: "20px 0",
    // height: "83px",
    borderRadius: "10px",
    "&:hover": {
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 10px 0px",
      backgroundColor: "#EEEEEE",
      marginLeft: ".5rem",
      transition: "ease-in-out .5s",
    },
  },
  gridElement: {
    margin: "0",
    paddingBottom: "0 !important",
    borderBottom: "none",
    color: "#252733",
    fontSize: "18px",
    fontWeight: "bold",
    margin: ".8rem 0",
    backgroundColor: "transparent",
  },

  listingStatusF: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  margin: {
    margin: "5px",
    fontSize: "15px",
    borderRadius: "4px",
    "&:hover": { backgroundColor: "rgba(58,99,81,0.2)" },
  },
  editIcon: {
    color: "#000000",
    fontSize: "2rem",
  },
  popover: {
    "&:hover": { backgroundColor: "#fff" },
    "&:focus": { backgroundColor: "#fff" },
  },

  heroBtn: {
    backgroundColor: "#D5D7DF",
    borderRadius: "15px",
    border: "none",
    fontSize: "18px",
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },

  /////Account Info

  personIcon: {
    background: "#F2EDD7",
    color: "#58D1BB",
    marginRight: "5px",
    fontSize: "25px",
    borderRadius: "4px",
  },
  emailIcon: {
    background: "#F2EDD7",
    color: "#58D1BB",
    marginRight: "5px",
    fontSize: "25px",
    borderRadius: "4px",
  },
  accountInfoHolder: {
    marginTop: "20px",
    padding: "1rem 2rem 1rem 1.5rem",
    backgroundColor: "#eeeeee",
    boxShadow: "-9px 9px 16px rgba(0, 0, 0, 0.05)",
    borderRadius: "5px",
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
  accountNameHolder: {
    marginBottom: "20px",
    marginTop: "3px",
    marginLeft: "15px",
    paddingTop: "20px",
  },
  textName: {
    display: "inline",
    fontSize: "16px",
  },
  textEmail: {
    display: "inline",
    fontSize: "16px",
  },
  plusIcon: {
    backgroundColor: "#3A6351",
    borderRadius: "4px",
    color: "#F2EDD7",
    padding: "5px 20px 5px 20px",
  },
  creditTypeHolder: {
    borderRadius: "5px",
    backgroundColor: "#F2EDD7",
    border: "0.5px solid rgba(228, 130, 87, 0.8)",
    height: "40px",
    margin: "10px",
  },
  creditText: {
    backgroundColor: "rgba(57,50,50,0.2)",
    padding: "4px 8px 4px 8px",
    borderRadius: "5px",
  },
}));

export default useStyles;
