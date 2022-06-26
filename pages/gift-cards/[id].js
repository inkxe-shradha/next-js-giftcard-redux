import React from "react";
import { getAskedNumberOfRecords } from "../../file-reader/fileReader";
import Container from "@mui/material/Container";
import CardDetails from "../../components/Gird/CardDetails";
const GiftCardDetails = ({ id }) => {
  return (
    <Container maxWidth="xl" className="mt-5">
      <CardDetails id={id} />
    </Container>
  );
};

export const getStaticPaths = async () => {
  // Caching the important id for server-side caching and SEO optimization
  const fetchFirstTenRecords = getAskedNumberOfRecords(10);
  return {
    paths: fetchFirstTenRecords.map((item) => ({
      params: { id: String(item.id) },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params;
  return {
    props: {
      id,
    },
  };
};
export default GiftCardDetails;
