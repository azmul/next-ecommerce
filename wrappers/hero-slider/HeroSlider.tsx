import React, {useEffect} from "react";
import Swiper from "react-id-swiper";
import HeroSliderSingle from "../../components/hero-slider/HeroSliderSingle";
import { useDispatch, useSelector } from "react-redux";
import { getSliders } from "../../redux/actions/sliderActions";
import { RootState } from "../../redux/store";

const HeroSliderOne = () => {
  const dispatch = useDispatch();
  const heroSliderData = useSelector((state: RootState) => state.sliderData.sliders)

  useEffect(() => {
    dispatch(getSliders());
  },[dispatch])

  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper {...params}>
          {heroSliderData &&
            heroSliderData.length > 0 &&
            heroSliderData.map((single, key) => {
              return (
                <HeroSliderSingle
                  sliderClassName="swiper-slide"
                  data={single}
                  key={key}
                />
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderOne;
