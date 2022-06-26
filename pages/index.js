import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import CustomCarousel from "../components/Home/CustomCoursal";
import StaticCoupons from "../components/Home/StaticCoupons";
import { readMyFile } from "../file-reader/fileReader";
import MetaHeader from "../components/Meta/MetaHeader";
export default function Home({ staticCoupons }) {
  return (
    <>
      <MetaHeader
        title="Yoyo Gift Card"
        description="Best Gift card site to earn rewards on your each purchase"
      />
      <CustomCarousel />
      <Divider sx={{ marginTop: 5 }}>
        <Chip label="Most Viewed" />
      </Divider>
      <StaticCoupons staticCoupons={staticCoupons} />
    </>
  );
}

export const getStaticProps = () => {
  const loadedStaticFiles = readMyFile("static-file.json");
  return {
    props: {
      staticCoupons: loadedStaticFiles,
    },
    revalidate: 72000,
  };
};
