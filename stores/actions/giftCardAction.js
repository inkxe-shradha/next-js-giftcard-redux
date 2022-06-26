import {
  loadGiftCards,
  saveNewCards,
  deleteGiftCard,
  updateGiftCardsDetails,
  loadSingleCardSlot,
  loadGiftCardSentList,
  loadGiftCardReceivedList,
  updateUserDetails,
  saveGiftCardTransact,
} from "../../Client/API/client-api";
import { beginsLoading, endsLoading } from "./loadingAction";
import {
  LOAD_GIFT_CARDS,
  LOAD_SINGLE_GIFT_CARDS,
  GIFT_CARD_RECEIVED,
  GIFT_CARD_SENT,
  SEND_EMAIL_START,
  UPDATE_GIFT_CARD,
  BEGINS_CARD_LOADING,
  UPDATE_GIFT_RECEIVER,
  SEND_EMAIL_END,
  UPDATE_GIFT_CARD_LIST,
  ENDS_CARD_LOADING,
  DELETE_GIFT_CARDS,
  ADD_COMMENTS,
  HAS_MORE_CARDS,
  UPDATE_USER_DETAILS,
} from "../types";
// Action Dispatchers //
export const hasMoreCard = (payload) => ({
  type: HAS_MORE_CARDS,
  payload,
});
export const onLoadedCard = (payload) => ({ type: LOAD_GIFT_CARDS, payload });
const beginsCardLoading = () => ({ type: BEGINS_CARD_LOADING });
const endCardLoading = () => ({ type: ENDS_CARD_LOADING });
const onRemovedCardFromList = (payload) => ({
  type: DELETE_GIFT_CARDS,
  payload,
});

const updateGiftCardList = (payload) => ({
  type: UPDATE_GIFT_CARD_LIST,
  payload,
});

const onLoadSingleCardDetails = (payload) => ({
  type: LOAD_SINGLE_GIFT_CARDS,
  payload,
});

const onAddComments = (payload) => ({
  type: ADD_COMMENTS,
  payload,
});

const onLoadedGiftCardReceived = (payload) => ({
  type: GIFT_CARD_RECEIVED,
  payload,
});

const onLoadedGiftCardSent = (payload) => ({
  type: GIFT_CARD_SENT,
  payload,
});

const updateUserDetailsPayload = (payload) => ({
  type: UPDATE_USER_DETAILS,
  payload,
});

const updateCardDetailsPayload = (payload) => ({
  type: UPDATE_GIFT_CARD,
  payload,
});
const startEmailLoading = () => ({ type: SEND_EMAIL_START });
const stopEmailLoading = () => ({ type: SEND_EMAIL_END });

//******************************************** */

/**
 * Handel Load Gift Cards and dispatch action to store
 * @param {*} pageNumber
 * @param {*} pageSize
 * @param {*} searchText
 * @param {*} sortBy
 * @param {*} filterBy
 * @returns
 */
export const loadGiftCard =
  (
    pageNumber = 1,
    pageSize = 20,
    searchText = "",
    sortBy = {},
    filterBy = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch(beginsLoading());
      const {
        data: { giftCards = [] },
      } = await loadGiftCards(
        pageNumber,
        pageSize,
        filterBy,
        sortBy,
        searchText
      );
      if (giftCards.length > 0) {
        dispatch(onLoadedCard(giftCards));
      } else {
        dispatch(hasMoreCard(false));
      }
      dispatch(endsLoading());
    } catch (error) {
      console.log("Error", error);
      dispatch(endsLoading());
    }
  };

/**
 * Add comments to gift card
 * @param {*} card
 * @returns Promise
 */
// Adding the new card to the user
export const addGiftCard = (card) => async (dispatch) => {
  try {
    dispatch(beginsCardLoading());
    if (card.id) {
      const { data } = await updateGiftCardsDetails(card);
      dispatch(updateGiftCardList(card));
      dispatch(endCardLoading());
      return Promise.resolve(card);
    } else {
      const { data } = await saveNewCards(card);
      dispatch(
        loadGiftCard(
          1,
          20,
          "",
          {
            type: "id",
            sortByOrder: "desc",
          },
          "All"
        )
      );
      dispatch(endCardLoading());
      return Promise.resolve(data);
    }
  } catch (error) {
    console.log("Error", error);
    dispatch(endCardLoading());
  }
};

/**
 * Remove the deleted cards from the store
 * @param {*} id
 * @returns
 */
// Removing the card from the user
export const deleteGiftCardList = (id) => async (dispatch) => {
  try {
    dispatch(beginsLoading());
    const { data } = await deleteGiftCard(id);
    dispatch(onRemovedCardFromList(id));
    dispatch(endsLoading());
    return Promise.resolve(data);
  } catch (error) {
    dispatch(endsLoading());
    console.log("Error", error);
  }
};

/**
 * Used for fetch the single records from the file system
 * @param {*} id
 * @returns dipatch event
 */
export const loadSingleCard = (id) => async (dispatch) => {
  try {
    dispatch(beginsLoading());
    const { data } = await loadSingleCardSlot(id);
    dispatch(onLoadSingleCardDetails(data?.card));
    dispatch(endsLoading());
  } catch (error) {
    console.log("Error", error);
    dispatch(endsLoading());
  }
};

/**
 * Used for load all the gift cards received for that user.
 * @returns dispatch event
 */
export const loadGiftCardReceived = () => async (dispatch) => {
  try {
    dispatch(beginsLoading());
    const { data } = await loadGiftCardReceivedList();
    dispatch(onLoadedGiftCardReceived(data));
    dispatch(endsLoading());
  } catch (error) {
    console.log("Error", error);
    dispatch(endsLoading());
  }
};

/**
 * Used for load all the gift cards send by the user to the other users.
 * @returns dispatch event
 */
export const loadGiftCardSent = () => async (dispatch) => {
  try {
    dispatch(beginsLoading());
    const { data } = await loadGiftCardSentList();
    dispatch(onLoadedGiftCardSent(data));
    dispatch(endsLoading());
  } catch (error) {
    console.log("Error", error);
    dispatch(endsLoading());
  }
};

/**
 * Used for sending the Gift card from your account to the other users.
 * Here we used all the validation methods
 * @param {*} toEmail
 * @param {*} fromEmail
 * @param {*} message
 * @param {*} giftCard
 * @returns
 */
export const sendEmail =
  (toEmail, fromEmail, giftCard, user = "") =>
  async (dispatch) => {
    try {
      dispatch(startEmailLoading());
      const balancePoints = user.balance_points - giftCard.cardPoints;
      await updateUserDetails({
        ...user,
        balance_points: balancePoints,
      });
      dispatch(
        updateUserDetailsPayload({
          ...user,
          balance_points: balancePoints,
        })
      );

      // Sending the email.
      // Removing the item from the gift card
      const { uploadedData } = await updateGiftCardsDetails({
        ...giftCard,
        cardCount: giftCard.cardCount - 1,
      });

      dispatch(
        updateCardDetailsPayload({
          ...giftCard,
          cardCount: giftCard.cardCount - 1,
        })
      );

      // Logging the sending data into the gift transactions
      const transactionsObj = {
        senderEmail: fromEmail,
        receiverEmail: toEmail,
        cardId: giftCard.id,
        cardName: giftCard.cardName,
        cardPoints: giftCard.cardPoints,
        cardShortDesc: giftCard.cardShortDesc,
        cardIssueDate: giftCard.cardIssueDate,
        cardExpiryDate: giftCard.cardExpiryDate,
        isRedeemed: false,
      };
      const { transatData } = await saveGiftCardTransact(transactionsObj);
      dispatch(stopEmailLoading());
      // Return promise
      return Promise.resolve();
    } catch (error) {
      console.log("Error", error);
      dispatch(stopEmailLoading());
      return Promise.reject(error);
    }
  };

/***************************************** CARD COMMENT ACTIONS (ALL WILL BE HANDEL BY ONE FUNCTION) ****************************************************/
export const addNewComment = (card) => async (dispatch) => {
  try {
    dispatch(beginsLoading());
    await updateGiftCardsDetails(card);
    dispatch(onAddComments(card));
    dispatch(endsLoading());
    return Promise.resolve(card);
  } catch (error) {
    console.log("Error", error);
  }
};
