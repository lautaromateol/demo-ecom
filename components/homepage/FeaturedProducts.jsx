"use client";
import Slider from "react-slick";
import Link from "next/link";
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

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

function FeaturedProducts({ bestRated }) {

  return (
    <section className="py-12 md:py-24 px-6 lg:px-0">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-1">
          <h3 className="text-lg text-main font-medium uppercase tracking-wider mb-4">
            Featured products
          </h3>
          <p className="text-secondary leading-relaxed mb-6">
            Each piece is meticulously crafted with simplicity and
            functionality in mind. Our designs blend seamlessly into
            contemporary spaces, offering both elegance and practicality.
          </p>
          <Link
            className="text-main text-sm font-medium uppercase transition-all hover:border-b border-tint hover:text-tint"
            href="#"
          >
            View all
          </Link>
        </div>
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
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts