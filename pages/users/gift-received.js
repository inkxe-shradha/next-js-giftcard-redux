import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import GridTable from "../../components/Table/GridTable";
import { useSession } from "next-auth/react";
import { loadGiftCardReceived } from "../../stores/actions/giftCardAction";

const GiftReceived = () => {
  const { giftCardReceived } = useSelector((state) => ({
    giftCardReceived: state.giftCard.giftCardReceived,
  }));
  const { status } = useSession();
  const dispatch = useDispatch();
  const isMount = React.useRef(false);

  const redeemCoupon = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to redeem the coupon?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Redeem",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "Please wait...",
          text: "Redeeming coupon...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        dispatch(redeemGiftCard(data)).then(() => {
          toast.success("Coupon Redeemed Successfully");
          Swal.close();
        });
      }
    });
  };

  React.useEffect(() => {
    if (isMount.current) return;
    giftCardReceived.length === 0 && dispatch(loadGiftCardReceived());
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
          Gift Card Received
        </Typography>
        <Divider
          sx={{
            marginBlock: (theme) => theme.spacing(2),
          }}
        />
        <GridTable
          tableType="received"
          isAuthenticated={status === "authenticated"}
          giftCardList={giftCardReceived}
          redeemCoupon={redeemCoupon}
        />
      </Paper>
    </Container>
  );
};

export default GiftReceived;
