import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getSession } from "next-auth/react";
import GridList from "../../components/Gird/GridList";
import {
  checkedLoginUserAccessStatus,
  getFilterURLStrings,
} from "../../components/utils/sharedutils";

const GiftCardPage = ({ cards: { giftCards }, sessionData }) => {
  const isAdmin = checkedLoginUserAccessStatus(sessionData?.user?.email);
  const isUserLoggedIn = sessionData?.user ? true : false;

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <GridList
          loadedCards={giftCards}
          isAdmin={isAdmin}
          userLoggedIn={isUserLoggedIn}
        />
      </Grid>
    </Container>
  );
};

const loadGiftCards = async (
  pageNumber = 1,
  limit = 20,
  filterBy = "all",
  sortBy = { type: "id", sortByOrder: "desc" },
  searchText = ""
) => {
  const filterString = getFilterURLStrings(
    pageNumber,
    limit,
    filterBy,
    sortBy,
    searchText
  );
  const response = await fetch(
    `${
      process.env.NEXTAUTH_URL || "http://localhost:3000"
    }/api/giftcards${filterString}`
  );
  const data = await response.json();
  return data;
};

export async function getServerSideProps(context) {
  // Get query params
  const query = context.query;
  const page = query._page || 1;
  const perPage = query._limit || 20;
  // Get Filter params
  const filterBy = query.cardRetailer || "all";
  const sortBy = query._sort || "points";
  const sortByOrder = query._order || "desc";
  const searchText = query.q || "";
  // Get Card files
  const getAllGiftCardsList = await loadGiftCards(
    page,
    perPage,
    filterBy,
    { type: sortBy, sortByOrder },
    searchText
  );
  // Get filtered cards
  const sessionData = await getSession({ req: context.req });
  return {
    props: {
      cards: getAllGiftCardsList,
      sessionData,
    }, // will be passed to the page component as props
  };
}

export default GiftCardPage;
