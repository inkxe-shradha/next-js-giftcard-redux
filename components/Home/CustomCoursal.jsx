import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Carousel } from "react-responsive-carousel";

const CustomCarousel = () => {
  const settings = {
    autoPlay: true,
    dynamicHeight: false,
    showThumbs: false,
  };
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
  };
  return (
    <div className="container-fluid">
      <Carousel {...settings}>
        <div>
          <Image
            layout="responsive"
            className="carousel-img"
            src="https://source.unsplash.com/featured/900x450?gift-cards"
            width={900}
            height={450}
            alt="amazon"
          />
          <button onClick={() => navigate("/gift-cards")} className="legend">
            {" "}
            Grab it
          </button>
        </div>
        <div>
          <Image
            layout="responsive"
            className="carousel-img"
            width={900}
            height={450}
            src="https://source.unsplash.com/featured/900x450?coupon"
            alt="flipkart"
          />
          <button onClick={() => navigate("/gift-cards")} className="legend">
            {" "}
            Grab it
          </button>
        </div>
        <div>
          <Image
            layout="responsive"
            className="carousel-img"
            width={900}
            height={450}
            src="https://source.unsplash.com/featured/900x450?google"
            alt="google"
          />
          <button onClick={() => navigate("/gift-cards")} className="legend">
            {" "}
            Grab it
          </button>
        </div>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
