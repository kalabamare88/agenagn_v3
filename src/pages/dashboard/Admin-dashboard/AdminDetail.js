import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import backEndApi from "../../../services/api";
import { Redirect, useParams } from "react-router-dom";
import { houseDetail } from "../../../features/house/houseSlice";
import Loader from "../User-dashboard/Loader";
import { renFloor } from "./renFlorr";
function Detail({ setSideBar }) {
  const local = "http://localhost:5000";
  const dispatch = useDispatch();
  const {
    houseData,
    houseDetailIsLoading,
    houseDetailIsSuccess,
    houseDetailIsFail,
    errorMessage,
  } = useSelector((state) => state.house);
  let { id } = useParams();

  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);

  const [isReload, setIsReload] = useState(false);

  const [activeImg, setActiveImg] = useState([]);
  useEffect(() => {
    if (houseDetailIsSuccess) {
      setData(houseData.docs);
      setFiles(houseData.files);
      setActiveImg(houseData.files[0]);
      if (houseData.docs.email !== "justt@gmail.com") {
        return <Redirect to="/login" />;
      }
    }
  }, [houseData]);

  useEffect(() => {
    dispatch(houseDetail(id));
  }, [dispatch]);

  const onButtonClick = async (value, id) => {
    const buttonClicked = {
      id: id,
      selectedButton: value,
    };
    await backEndApi.post("/changeHomeStatus", {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("token")),
      },
      params: buttonClicked,
    });
    setIsReload(true);
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }
  if (isReload) {
    window.location.reload();
  }
  return (
    <>
      {houseDetailIsSuccess ? (
        <div className="root">
          <div className="container">
            <div className="image-grid">
              <div className="small-images">
                {houseData.files
                  ? houseData.files.map((file) => {
                      return (
                        <button
                          style={{ outline: "none", border: "0 solid #eeeeee" }}
                          onClick={() => setActiveImg(file)}
                        >
                          <img
                            src={`${local}/images/products/${houseData.docs.ownerEmail}/${houseData.docs._id}/${file}`}
                            alt={`${houseData.docs.location}`}
                            className="simg"
                          />
                        </button>
                      );
                    })
                  : ""}
              </div>
              <div className="one-big-image">
                <img
                  src={`${local}/images/products/${houseData.docs.ownerEmail}/${houseData.docs._id}/${activeImg}`}
                  className="limg"
                  alt="do"
                />
              </div>
            </div>

            <div className="detail-holder">
              <div className="att">
                <span className="att-title">Location</span>
                <span className="att-value">{houseData.docs.location}</span>
              </div>
              <div className="att">
                <span className="att-title">Bed Rooms</span>
                <span className="att-value">{houseData.docs.bed_room}</span>
              </div>
              <div className="att">
                <span className="att-title">Monthly Rent</span>
                <span className="att-value">
                  {houseData.docs.monthly_payment} Birr
                </span>
              </div>
              <div className="att">
                <span className="att-title">Floor</span>
                <span className="att-value">{renFloor(data)} Floor</span>
              </div>
              <div className="att">
                <span className="att-title">Status</span>
                <span
                  className={`att-value ${
                    houseData.docs.reviewStatus === "Approved"
                      ? "success"
                      : "danger"
                  }`}
                >
                  {houseData.docs.reviewStatus}
                </span>
              </div>
              <div className="att">
                <span className="att-title">Description</span>
                <span
                  className="att-value"
                  style={{
                    wordWrap: "break-word",
                    maxHeight: "150px",
                    overflow: "auto",
                  }}
                >
                  {houseData.docs.description}
                </span>
              </div>
              <div className="buttonHolder">
                {/*disabled={data.reviewStatus!=='Approved'}*/}
                <button
                  className="actionButtons "
                  onClick={() => onButtonClick("Rejected", houseData.docs._id)}
                >
                  Reject
                </button>
                {/*disabled={data.reviewStatus==='Approved'}*/}
                <button
                  className="actionButtons "
                  onClick={() => onButtonClick("Approved", houseData.docs._id)}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
          <div className={"userDetailRoot"}>
            <div className="usedetailholder">
              <div>Owner Detail</div>
              <div className="userDetailItems">
                <span>Phone Number : {houseData.docs.phone_number}</span>
                <span>Email : {houseData.docs.ownerEmail}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "<Loader />"
      )}
    </>
  );
}

export default Detail;
