import axios from "axios";
import { getFilterURLStrings } from "../../components/utils/sharedutils";

export const loadGiftCards = (
  pageNumber,
  limit,
  filterBy = "all",
  sortBy,
  searchText
) => {
  // JSON Server Pagination
  const filterString = getFilterURLStrings(
    pageNumber,
    limit,
    filterBy,
    sortBy,
    searchText
  );
  return axios.get(`api/giftcards${filterString}`);
};

export const saveNewCards = (newCard) => {
  return axios.post("/api/giftcards/add-card", {
    cardList: newCard,
  });
};

export const deleteGiftCard = (cardId) => {
  return axios.delete(`/api/giftcards/${cardId}`);
};

export const updateGiftCardsDetails = (card) => {
  return axios.put(`/api/giftcards/${card.id}`, {
    card,
  });
};

export const loadSingleCardSlot = (id) => {
  return axios.get(`/api/giftcards/${id}`);
};

export const loadGiftCardReceivedList = () => {
  return axios.get("/api/giftcards/giftcard-transaction?status=received");
};

export const loadGiftCardSentList = () => {
  return axios.get("/api/giftcards/giftcard-transaction?status=sent");
};

export const updateUserDetails = (user) => {
  return axios.put(`/api/users/${user.id}`, { user });
};

export const saveGiftCardTransact = (giftCardTransact) => {
  return axios.post("/api/giftcards/giftcard-transaction", {
    giftCardTransact,
  });
};
