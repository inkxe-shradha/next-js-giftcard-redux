import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Button from "@mui/material/Button";

const GridTable = ({
  tableType = "sent" | "received",
  isAuthenticated,
  giftCardList,
  redeemCoupon,
}) => {
  return (
    <div className="row">
      <div className="col-md-12 table-responsive">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Card name</th>
              <th scope="col">Points</th>
              <th scope="col">Description</th>
              {tableType === "sent" ? (
                <th scope="col"> Sent To</th>
              ) : (
                <th scope="col">Received From</th>
              )}
              <th scope="col">Issued Date</th>
              <th scope="col">Expiry Date</th>
              {tableType === "received" && isAuthenticated && (
                <th scope="col">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {giftCardList && giftCardList.length === 0 ? (
              <tr>
                <td
                  className="text-white-50 text-center text-capitalize"
                  colSpan={tableType === "sent" ? 7 : isAuthenticated ? 8 : 7}
                >
                  {tableType === "sent" ? "No Sent Cards" : "No Received Cards"}
                </td>
              </tr>
            ) : (
              giftCardList.map((ele, index) => (
                <tr key={ele.id}>
                  <td>{index + 1}</td>
                  <td>{ele.cardName}</td>
                  <td>{ele.cardPoints}</td>
                  <td>{ele.cardShortDesc}</td>
                  {tableType === "sent" ? (
                    <td>{ele.receiverEmail}</td>
                  ) : (
                    <td>{ele.senderEmail}</td>
                  )}
                  <td>{moment(ele.cardIssueDate).format("DD-MM-YYYY")}</td>
                  <td>{moment(ele.cardExpiryDate).format("DD-MM-YYYY")}</td>
                  {tableType === "received" && isAuthenticated && (
                    <td>
                      {!ele.isRedeemed ? (
                        <Button
                          size="small"
                          color="success"
                          onClick={() => redeemCoupon(ele)}
                        >
                          Redeem
                        </Button>
                      ) : (
                        <Button size="small" color="error" disabled>
                          Redeemed
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>{" "}
    </div>
  );
};

GridTable.propTypes = {
  tableType: PropTypes.oneOf(["sent", "received"]),
  isAuthenticated: PropTypes.bool.isRequired,
  giftCardList: PropTypes.array.isRequired,
  redeemCoupon: PropTypes.func,
};
export default GridTable;
