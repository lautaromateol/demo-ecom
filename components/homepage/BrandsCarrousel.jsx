"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandsCarrousel = () => {

    const images = [
        "https://res.cloudinary.com/dubuaqpfm/image/upload/v1708471796/Universal_Logo-removebg-preview_d8qa4p.png",
        "https://res.cloudinary.com/dubuaqpfm/image/upload/v1708471808/Optimum_Nutrition_Logo-removebg-preview_xex902.png",
        "https://res.cloudinary.com/dubuaqpfm/image/upload/v1708471818/ENA_Logo-removebg-preview_nb1awk.png",
        "https://res.cloudinary.com/dubuaqpfm/image/upload/v1708471823/Efectiv_Logo-removebg-preview_qzq0cx.png",
        "https://res.cloudinary.com/dubuaqpfm/image/upload/v1708474569/Dymatize_Logo-removebg-preview_edls52.png",
        "https://res.cloudinary.com/dubuaqpfm/image/upload/v1708474914/Sascha_Logo-removebg-preview_mfzdjn.png",
        "https://res.cloudinary.com/dubuaqpfm/image/upload/v1708475607/Vital_S_Logo-removebg-preview_jud2nv.png",
        "https://res.cloudinary.com/dubuaqpfm/image/upload/v1708536830/BSN_Logo-removebg-preview_v6rt6r.png"
    ]

    var settings = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
    };

    var mobileSettings = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div>
            <div className="hidden md:block mt-[4rem]">
                <Slider {...settings}>
                    {images.map((image) => (
                        <img className="w-15" src={image} />
                    ))}
                </Slider>
            </div>
            <div className="block md:hidden mt-[4rem]">
                <Slider {...mobileSettings}>
                    {images.map((image) => (
                        <img className="w-15" src={image} />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default BrandsCarrousel