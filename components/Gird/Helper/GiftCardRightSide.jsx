import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import GiftComment from "./GiftComment";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import StarRatingComponent from "react-star-rating-component";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import { addNewComment } from "../../../stores/actions/giftCardAction";
import moment from "moment";

function GiftCardRightSide({ classes, cardDetails }) {
  const userObject = useSelector((state) => state.auth.user);
  const { emailLoader, emailError } = useSelector((state) => ({
    emailLoader: state.giftCard.sendingEmailLoader,
    emailError: state.giftCard.giftCardError,
  }));
  const [starCount, setStarCount] = React.useState(0);
  const [comment, setCommentCount] = React.useState("");
  const [isCommentEmpty, setCommentEmpty] = React.useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = React.useState(false);
  const [errorMess, setErrorMess] = React.useState(emailError || "");
  const [editCommentId, setEditCommentId] = React.useState(null);
  const commentRef = React.useRef(null);
  const { status, session } = useSession();
  const dispatch = useDispatch();

  const onRemoveComments = (id) => {
    const newComments = cardDetails.cardComments.filter(
      (comment) => comment.id !== id
    );
    dispatch(
      addNewComment({
        ...cardDetails,
        cardComments: newComments,
      })
    );
  };

  const onEditComments = (comment) => {
    setCommentCount(comment.comment);
    setStarCount(comment.rating);
    setEditCommentId(comment.id);
    commentRef.current.focus();
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handelAddComment = (e) => {
    if (!comment) {
      setCommentEmpty(true);
      return;
    }
    let commentObj = {};
    if (!editCommentId) {
      commentObj = {
        name: userObject.name,
        email: userObject.email,
        rating: starCount,
        comment,
        commented_on: moment().format("YYYY-MM-DD"),
        id: new Date().getTime() + Math.floor(Math.random() * 1000 + 1000),
      };
    }
    setCommentEmpty(false);
    dispatch(
      addNewComment({
        ...cardDetails,
        cardComments: !editCommentId
          ? [...cardDetails.cardComments, commentObj]
          : cardDetails.cardComments.map((ele) => {
              if (ele.id === editCommentId) {
                return { ...ele, comment, rating: starCount };
              }
              return ele;
            }),
      })
    ).then(() => {
      setCommentCount("");
      setStarCount(0);
      setEditCommentId(null);
    });
  };
  const authenticationStatus = status === "authenticated";
  return (
    <Grid item xs={12} md={8} sm={6}>
      <Box>
        <Typography variant="h4">
          {cardDetails.cardName} - <small> {cardDetails.cardRetailer}</small>
        </Typography>
      </Box>
      {/* Product Description */}
      <Box className="mt-2">
        <Typography variant="body">{cardDetails.cardLongDesc}</Typography>
      </Box>
      <Divider className="my-2" />
      {/* Comment Section */}
      <Box className={classes.maxImageHeight}>
        <Typography variant="h6">Rating & Reviews</Typography>
        {cardDetails?.cardComments?.length > 0 &&
          cardDetails.cardComments.map((comment) => (
            <GiftComment
              comment={comment}
              key={comment.id}
              currentUser={userObject}
              onRemove={onRemoveComments}
              onEdit={onEditComments}
            />
          ))}
        {/* No comments */}
        {cardDetails?.cardComments?.length === 0 && (
          <Typography variant="body" margin="normal" className="mt-2">
            <em> No comments yet. Be the first to comment.</em>
          </Typography>
        )}
      </Box>
      {/* Add New Comments */}
      {authenticationStatus && (
        <Paper
          elevation={10}
          sx={{
            padding: (theme) => {
              return theme.spacing(2);
            },
            marginTop: (theme) => {
              return theme.spacing(2);
            },
          }}
        >
          <div className="my-2">
            <Typography variant="h6">Add Comment</Typography>
            <Typography variant="body">
              Please add your comment here.
            </Typography>
          </div>
          <StarRatingComponent
            name="rating"
            starCount={5}
            value={starCount}
            emptyStarColor="#ffff"
            editing={true}
            onStarClick={(nextValue) => setStarCount(nextValue)}
          />
          <TextField
            inputRef={commentRef}
            id="outlined-pass-comments-static"
            label="Your valuable comments..."
            aria-label="your comments"
            fullWidth
            multiline
            rows={4}
            name="comment"
            required
            value={comment}
            error={isCommentEmpty}
            onChange={(e) => setCommentCount(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handelAddComment}
            className={!authenticationStatus ? "d-none" : "btn-comment mt-2"}
          >
            {editCommentId ? "Edit Comment" : "Add Comment"}
          </Button>
        </Paper>
      )}
    </Grid>
  );
}

GiftCardRightSide.propTypes = {
  classes: PropTypes.object.isRequired,
  cardDetails: PropTypes.object.isRequired,
};

export default GiftCardRightSide;
