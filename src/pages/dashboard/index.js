import React, { useEffect, useState } from "react";
import UserDashboard from "./User-dashboard/UserDashboard";
import AdminDashboard from "./Admin-dashboard/AdminDashboard";
import backEndApi from "../../services/api";
import Loader from "./User-dashboard/Loader";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardData,
  getFilterDashboardData,
} from "../../features/dashboard/dashboardSlice";
// import { houseStateCleaner } from "../../features/house/houseSlice";

// const useStyles = theme => ({
//     root: {
//         marginTop: '20px',
//     },
//     table: {
//         minWidth: 650,
//     },
//     tableContainer: {
//         padding: '12px',
//         borderRadius: '5px',
//         backgroundColor: '#F2EDD7',

//     },
//     margin: {
//         margin: '5px',
//         fontSize: '15px',
//         borderRadius: '4px',
//         "&:hover": {backgroundColor: '#3A6351'},
//     },
//     iconBackgroundRed: {
//         backgroundColor: 'rgba(228,130,87,0.21)'
//     },
//     deleteIcon: {
//         color: '#F24545'
//     },
//     editIcon: {
//         color: '#E48257'

//     },
//     iconBackgroundBlack: {
//         backgroundColor: 'rgba(57,50,50,0.2)'
//     },
// });

export default function Dashboard(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isError, errorMessage } = useSelector(
    (state) => state.dashboard
  );
  const [auth, setAuth] = useState("");
  const [isAuth, setIsAuth] = useState(true);

  const onRadioGroupChange = (e) => {
    dispatch(getFilterDashboardData(e));
  };

  const authenticate = () => {
    if (data.auth === "Admin") {
      return (
        <AdminDashboard
          {...props}
          data={data}
          onRadioGroupChange={onRadioGroupChange}
        />
      );
    } else if (data.auth === "User") {
      return <UserDashboard data={data} />;
    } else if (auth === "") {
      return (
        <div>
          <Loader />
        </div>
      );
    }
  };

  useEffect(() => {
    // const checkLocalStorage = () => {
    // if (localStorage.getItem("token")) {
    //   const config = {
    //     headers: {
    //       "x-access-token": JSON.parse(localStorage.getItem("token")),
    //     },
    //   };
    //   const response = await backEndApi.get("/dashboard", config);
    // setAuth(response.data.auth);
    // } else {
    //   setIsAuth(false);
    // }
    // };
    dispatch(getDashboardData());
    // dispatch(houseStateCleaner);
    // checkLocalStorage();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      history.push("/");
    }
  }, [isAuth]);

  return <div>{isSuccess && authenticate()}</div>;
}
