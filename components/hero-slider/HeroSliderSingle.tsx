import PropTypes from "prop-types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import IsUrl from "is-url";

const HeroSliderSingle = ({ data, sliderClassName }) => {
  return (
    <div
      className={`single-slider slider-height-1 bg-purple ${
        sliderClassName ? sliderClassName : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-content slider-animated-1">
              <h3 className="animated">{data.title}</h3>
              <h1 className="animated">{data.subtitle}</h1>
              <div className="slider-btn btn-hover">
              <div className="animated">
                <Link passHref href={data.url}>
                SHOP NOW
                </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-single-img slider-animated-1">
              {IsUrl(data.image) && <Image layout='fill' className="animated img-fluid" src={data.image} alt="" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string,
};

export default HeroSliderSingle;
