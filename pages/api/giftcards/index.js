import { getAllGiftCardsList as listCards } from "../../../file-reader/fileReader";

export default function handler(req, res) {
  // Fetching all passed query params
  const query = req.query;
  // Fetching card files
  const getAllGiftCardsList = listCards();
  // Add Pagination logic
  const page = query._page || 1;
  const perPage = query._limit || 10;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  let giftCards = getAllGiftCardsList;
  // Added filter and sorting loginType
  const filterBy = query.cardRetailer || "all";
  const sortBy = query._sort || "id";
  const sortByOrder = query._order || "desc";
  const searchText = query.q || "";
  // Get filtered cards
  if (filterBy !== "all") {
    giftCards = giftCards.filter(
      (card) => card.cardRetailer.toLowerCase() === filterBy.toLowerCase()
    );
  }
  // Search Text Implementation
  if (searchText !== "") {
    giftCards = giftCards.filter(
      (card) =>
        card.cardName.toLowerCase().includes(searchText.toLowerCase()) ||
        card.cardCategory.toLowerCase().includes(searchText.toLowerCase()) ||
        card.cardRetailer.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  // SortBy Id implementation
  if (sortBy !== "id") {
    giftCards = giftCards.sort((a, b) => {
      if (sortByOrder === "asc") {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
  } else {
    giftCards = giftCards.sort((a, b) => {
      return b.id - a.id;
    });
  }
  // Return response
  res.status(200).json({
    giftCards: giftCards.slice(start, end),
  });
}
