"use client";
import Slider from "react-slick";
import ProductCard from "../product/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const mobileSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const tabletSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1
};

export default function Collection({category}) {

  const products = category?.products

  return (
    <section className="py-24 px-6 lg:px-0">
      <div className="mx-auto max-w-7xl">
        <p className="text-lg text-main font-medium uppercase tracking-wider mb-8">{category?.category?.name} collection</p>
        <div className="md:hidden">
          <Slider {...mobileSettings}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Slider>
        </div>
        <div className="hidden md:block lg:hidden">
          <Slider {...tabletSettings}>
            {products.map((product) => (
              <div className="px-4">
                <ProductCard key={product._id} product={product} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="hidden lg:block">
          <Slider {...settings}>
            {products.map((product) => (
              <div className="px-4">
                <ProductCard key={product._id} product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}
