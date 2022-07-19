const ListingStatusFilter = (status, id) => {
  switch (status) {
    case "Active":
      return (
        <span
          id={id}
          style={{
            textTransform: "none",
            borderRadius: "12.5px",
            backgroundColor: "rgba(58,99,81,0.2)",
            padding: "7px 25px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          Active
        </span>
      );
    case "Inactive":
      return (
        <span
          id={id}
          style={{
            textTransform: "none",
            borderRadius: "12.5px",
            backgroundColor: "rgba(57,50,50,0.2)",
            padding: "7px 25px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          Inactive
        </span>
      );
    case "Draft":
      return (
        <span
          style={{
            textTransform: "none",
            borderRadius: "12.5px",
            backgroundColor: "rgba(57,50,50,0.2)",
            padding: "7px 25px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          Draft
        </span>
      );
    case "Submitted":
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
          Submitted
        </span>
      );
    default:
      return <div>Something occur</div>;
  }
};

export default ListingStatusFilter;
