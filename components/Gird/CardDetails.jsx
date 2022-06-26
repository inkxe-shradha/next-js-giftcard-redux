import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleCard } from "../../stores/actions/giftCardAction";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import GiftCardLeftSIde from "./Helper/GiftCardLeftSIde";
import GiftCardRightSide from "./Helper/GiftCardRightSide";
import MetaHeader from "../Meta/MetaHeader";

const styles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    border: "1px solid" + theme.palette.primary.main,
    wordBreak: "break-all",
    borderRadius: "10px",
    width: "100%",
  },
  maxImageHeight: {
    maxHeight: "500px",
    overflow: "auto",
  },
}));
const CardDetails = ({ id }) => {
  const classes = styles();
  const giftCardDetails = useSelector(
    (state) => state.giftCard.giftCardDetails
  );
  const { status } = useSession();
  const onMount = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (onMount.current) {
      return;
    }
    id && dispatch(loadSingleCard(id));
  }, [dispatch, id]);
  return (
    <>
      <MetaHeader
        title={giftCardDetails?.cardName}
        description={giftCardDetails?.cardLongDesc}
      />
      {giftCardDetails?.id && (
        <Paper className={classes.paper}>
          <Grid container spacing={4}>
            {/* Card Left Side */}
            <GiftCardLeftSIde
              cardDetails={giftCardDetails}
              isAuthenticated={status === "authenticated"}
            />
            {/* Card Right Side */}
            <GiftCardRightSide
              cardDetails={giftCardDetails}
              classes={classes}
              isAuthenticated={status === "authenticated"}
            />
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default CardDetails;
