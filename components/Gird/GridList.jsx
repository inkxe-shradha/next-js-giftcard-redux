import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import GiftFilter from "./Helper/GiftFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { loadGiftCard } from "../../stores/actions/giftCardAction";
import SingleCardList from "./Helper/SingleCardList";
import { getFilterURLStrings, randomString } from "../utils/sharedutils";
import { useRouter } from "next/router";
import { RESET_CARDS } from "../../stores/types";
import AddEditCard from "../../components/Gird/Helper/AddEditCard";
import { toast } from "react-toastify";
import {
  addGiftCard,
  deleteGiftCardList,
} from "../../stores/actions/giftCardAction";
import Swal from "sweetalert2";

const GridList = ({ loadedCards, isAdmin, userLoggedIn }) => {
  const router = useRouter();
  const isMounted = React.useRef(); // For Avoiding multiple call glitch introduced in React-18 StrictMode mode
  const { _page, _limit, _sort, _order, cardRetailer, q } = router.query;
  const pageNumber = React.useRef(_page ? parseInt(_page) : 1);
  const [pageSize, setPageSize] = React.useState(
    _limit ? parseInt(_limit) : 20
  );
  const [searchText, setSearchText] = React.useState(q || "");
  const [sortBy, setSortBy] = React.useState(
    _sort === "id" || !_sort ? "none" : _sort
  );
  const sortByOrder = React.useRef(
    _sort === "id" || !_order ? undefined : _order
  );
  const [filterBy, setFilterBy] = React.useState(cardRetailer || "All");
  const dispatch = useDispatch();
  const { giftCards, hasMore } = useSelector((state) => ({
    giftCards: state.giftCard.giftCardList,
    hasMore: state.giftCard.hasMoreCard,
  }));

  const [isOpenModal, setOpenModal] = React.useState(false);
  const [singleCard, setSingleCard] = React.useState({});
  const [currentMode, setCurrentMode] = React.useState("add");
  const cardLoadingState = useSelector((state) => state.giftCard.cardLoader);

  const onClickAddCard = (event) => {
    setCurrentMode("add");
    setOpenModal(true);
  };

  const handelCloseModal = () => {
    setOpenModal(false);
  };

  const handelEditCard = (card) => {
    setSingleCard(card);
    setCurrentMode("edit");
    setOpenModal(true);
  };

  const handelFormCardFormSubmit = (value) => {
    if (currentMode === "add") {
      resetCardView();
    }
    dispatch(addGiftCard(value)).then(() => {
      setOpenModal(false);
      currentMode === "add"
        ? toast.success("Gift Card Added Successfully")
        : toast.success("Gift Card Updated Successfully");
    });
  };

  const loadGiftCardList = React.useCallback(() => {
    dispatch(
      loadGiftCard(
        pageNumber.current,
        pageSize,
        searchText,
        { type: sortBy, sortByOrder: sortByOrder.current },
        filterBy
      )
    );
  }, [
    dispatch,
    filterBy,
    pageNumber,
    pageSize,
    sortByOrder,
    searchText,
    sortBy,
  ]);

  const fetchMoreData = () => {
    pageNumber.current += 1;
    loadGiftCardList();
  };

  const handelFilterBy = (filter) => {
    resetCardView();
    sortByOrder.current = null;
    setSortBy("none");
    let replaceableURL = getFilterURLStrings(
      pageNumber.current,
      pageSize,
      filter,
      { type: "none", sortByOrder: sortByOrder.current },
      searchText
    );
    router.replace("/gift-cards" + replaceableURL);
    setFilterBy(filter);
  };

  const handelSearchText = (text) => {
    resetCardView();
    let replaceableURL = getFilterURLStrings(
      pageNumber.current,
      pageSize,
      filterBy,
      { type: "none", sortByOrder: sortByOrder.current },
      searchText
    );
    router.replace("/gift-cards" + replaceableURL);
    setSearchText(text);
  };

  const handelRemoveCard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteGiftCardList(id)).then(() => {
          toast.success("Gift Card Deleted Successfully");
          Swal.close();
        });
      }
    });
  };

  const resetCardView = () => {
    dispatch({
      type: RESET_CARDS,
    });
    pageNumber.current = 1;
  };

  React.useEffect(() => {
    if (isMounted.current) return;
    giftCards.length === 0 && loadGiftCardList();
    return () => {
      if (searchText || sortBy !== "none" || filterBy !== "All") {
        resetCardView();
      }
    };
  }, [loadGiftCardList, filterBy, searchText, sortBy]);

  const handelOrderType = (type) => {
    resetCardView();
    sortByOrder.current = type;
    loadGiftCardList();
    let replaceableURL = getFilterURLStrings(
      pageNumber.current,
      pageSize,
      filterBy,
      { type: sortBy, sortByOrder: sortByOrder.current },
      searchText
    );
    router.replace("/gift-cards" + replaceableURL);
  };

  const handelSortBy = (event) => {
    resetCardView();
    if (event === "none") {
      sortByOrder.current = undefined;
    } else {
      sortByOrder.current = "asc";
    }
    setSortBy(event);
    let replaceableURL = getFilterURLStrings(
      pageNumber.current,
      pageSize,
      filterBy,
      { type: event, sortByOrder: sortByOrder.current },
      searchText
    );
    router.replace("/gift-cards" + replaceableURL);
  };
  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {/* {user.role === "admin" && ( */}
            <Button
              variant="outlined"
              color="success"
              className="float-end"
              onClick={onClickAddCard}
            >
              {" "}
              Add New Card{" "}
            </Button>
            {/* )} */}
            <Typography sx={{ marginBlock: 2 }} variant="h4" align="center">
              Gift Cards
            </Typography>
            <Divider />
            {/* Filter Options */}
            <GiftFilter
              ref={sortByOrder}
              filterBy={filterBy}
              sortBy={sortBy}
              handelFilterBy={(filter) => handelFilterBy(filter)}
              handelSortBy={(sortBy) => handelSortBy(sortBy)}
              handelOrderType={(type) => handelOrderType(type)}
              handelSearchText={(text) => handelSearchText(text)}
            />
            {/* Gift Card List */}
            <InfiniteScroll
              dataLength={giftCards.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<LinearProgress color="success" />}
            >
              <Grid container spacing={2}>
                {giftCards.length > 0 &&
                  giftCards.map((giftCard) => (
                    <SingleCardList
                      giftCard={giftCard}
                      key={giftCard.id + randomString()}
                      onEdit={handelEditCard}
                      onDelete={handelRemoveCard}
                      isAdmin={isAdmin}
                    />
                  ))}
                {/* No data found */}
                {giftCards.length === 0 && loadedCards.length === 0 && (
                  <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                      No Data Found
                    </Typography>
                  </Grid>
                )}
                {giftCards.length === 0 &&
                  loadedCards.map((giftCard) => (
                    <SingleCardList
                      giftCard={giftCard}
                      key={giftCard.id + randomString()}
                      onEdit={handelEditCard}
                      onDelete={handelRemoveCard}
                      isAdmin={isAdmin}
                      resetCardView={resetCardView}
                    />
                  ))}
              </Grid>
            </InfiniteScroll>
          </CardContent>
        </Card>
      </Grid>
      {/* Add Edit Gift-card Model */}
      {isOpenModal && (
        <AddEditCard
          isOpen={isOpenModal}
          onClose={handelCloseModal}
          mode={currentMode}
          giftCard={singleCard}
          isLoading={cardLoadingState}
          handelSubmitted={handelFormCardFormSubmit}
          errorMessage=""
        />
      )}
    </>
  );
};

export default GridList;
