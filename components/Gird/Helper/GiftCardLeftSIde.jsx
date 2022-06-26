import React from "react";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import SendEmailModal from "./SendEmailModal";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { sendEmail } from "../../../stores/actions/giftCardAction";

const GiftCardLeftSIde = ({ cardDetails, isAuthenticated = false }) => {
  const { emailLoader, emailError, userObject } = useSelector((state) => ({
    emailLoader: state.giftCard.sendingEmailLoader,
    emailError: state.giftCard.giftCardError,
    userObject: state.auth.user,
  }));
  const dispatch = useDispatch();
  const [isSendModalOpen, setIsSendModalOpen] = React.useState(false);
  const [errorMess, setErrorMess] = React.useState(emailError || "");

  const handelSendEmail = (value) => {
    if (
      +userObject.balance_points < +cardDetails.cardPoints ||
      +cardDetails.cardCount === 0
    ) {
      setErrorMess("Insufficient balance points");
      return;
    }
    dispatch(sendEmail(value.email, userObject.email, cardDetails, userObject))
      .then(() => {
        setErrorMess("");
        setIsSendModalOpen(false);
        toast.success("Email sent successfully");
      })
      .catch((err) => {
        setErrorMess("Email not sent");
      });
  };
  return (
    <>
      <Grid item xs={12} md={4} sm={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Image
              layout="responsive"
              src={cardDetails.cardImage}
              alt="Card Img Details"
              className="img-fluid img-thumbnail"
              width={250}
              height={250}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider className="mb-2" />
            <Button
              fullWidth
              onClick={() => setIsSendModalOpen(true)}
              variant="contained"
              className={!isAuthenticated ? "d-none" : ""}
            >
              Send The Gift
            </Button>
            <table className="table table-dark mt-1 table-borderless">
              <tbody>
                <tr>
                  <td>
                    <Typography variant="p" color="primary">
                      <strong>Gift Card Number</strong>
                    </Typography>
                  </td>
                  <td>#GIFT-{(cardDetails?.id || 101) + 2022}</td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="p" color="primary">
                      <strong>Gift Card Value</strong>
                    </Typography>
                  </td>
                  <td>$ {cardDetails.cardPoints}</td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="p" color="primary">
                      <strong>Gift Card Expiry Date</strong>
                    </Typography>
                  </td>
                  <td>
                    {moment(cardDetails.cardExpiryDate).format("MMMM Do YYYY")}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="p" color="primary">
                      <strong>Available Cards</strong>
                    </Typography>
                  </td>
                  <td>
                    {cardDetails.cardCount > 20 ? (
                      <span className="badge bg-gradient badge-pill bg-success">
                        {cardDetails.cardCount}
                      </span>
                    ) : (
                      <span className="badge bg-gradient badge-pill bg-danger">
                        {cardDetails.cardCount}
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
      </Grid>
      <SendEmailModal
        isOpen={isSendModalOpen}
        handleClose={() => setIsSendModalOpen(false)}
        handleSubmit={handelSendEmail}
        loading={emailLoader}
        errorMessage={errorMess}
      />
    </>
  );
};

GiftCardLeftSIde.propTypes = {
  cardDetails: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

export default GiftCardLeftSIde;
