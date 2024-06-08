"use client";
import ProductCard from "../product/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const mobileSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

export default function FeaturedProductsCarrousel({ bestRated }) {
  return (
    <>
      <div className="lg:hidden">
        <Slider {...mobileSettings}>
          {bestRated.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Slider>
      </div>
      <div className="hidden lg:block col-span-3">
        <Slider {...settings}>
          {bestRated.map((product) => (
            <div className="px-4">
              <ProductCard key={product._id} product={product} />
            </div>
          ))}
        </Slider>
      </div></>
  )
}
