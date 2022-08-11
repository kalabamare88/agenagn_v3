export const renFloor = (data) => {
  switch (data.floor) {
    case 0:
      return <span>ground</span>;
    case 1:
      return (
        <span>
          1<sup>st</sup>
        </span>
      );
    case 2:
      return (
        <span>
          2<sup>nd</sup>
        </span>
      );
    case 3:
      return (
        <span>
          3<sup>rd</sup>
        </span>
      );
    case 4:
      return (
        <span>
          4<sup>th</sup>
        </span>
      );
    case 5:
      return (
        <span>
          5<sup>th</sup>
        </span>
      );
    default:
      return <span> </span>;
  }
};
