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
    case "NA":
      return (
        <span
          style={{
            textTransform: "none",
            borderRadius: "12.5px",
            backgroundColor: "#8497FF",
            padding: "7px 25px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          NA
        </span>
      );
    default:
      return <div>Something occur</div>;
  }
};

export default ReviewStatusFilter;
