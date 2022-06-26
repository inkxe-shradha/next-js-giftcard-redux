import { Backdrop } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = ({ isLoading, backGroundColor = "#121212d1" }) => {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: backGroundColor,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

export default Spinner;
