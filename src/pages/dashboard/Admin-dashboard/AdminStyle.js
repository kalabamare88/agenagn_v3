import { makeStyles } from "@material-ui/core";

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
    marginLeft: ".1rem",
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
      transition: "ease-in-out .5s",
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
  gridHeader: {
    borderBottom: "none",
    color: "#9FA2B4",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: ".5rem",
  },
  gridElement: {
    borderBottom: "none",
    color: "#252733",
    fontSize: "18px",
    fontWeight: "bold",
    margin: ".8rem 0",
    backgroundColor: "transparent",
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

export default useStyles;
