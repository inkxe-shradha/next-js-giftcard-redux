import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import GridTable from "../../components/Table/GridTable";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { loadGiftCardSent } from "../../stores/actions/giftCardAction";

const GiftSent = () => {
  const { giftCardSent } = useSelector((state) => ({
    giftCardSent: state.giftCard.giftCardSent,
  }));
  const isMount = React.useRef();
  const { status } = useSession();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isMount.current) return;
    dispatch(loadGiftCardSent());
  }, [dispatch]);
  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          padding: (theme) => theme.spacing(2),
        }}
        elevation={3}
      >
        <Typography variant="h4" align="center">
          Gift Card Sent
        </Typography>
        <Divider
          sx={{
            marginBlock: (theme) => theme.spacing(2),
          }}
        />
        <GridTable
          tableType="sent"
          isAuthenticated={status === "authenticated"}
          giftCardList={giftCardSent}
        />
      </Paper>
    </Container>
  );
};

export default GiftSent;
