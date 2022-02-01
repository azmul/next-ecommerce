import PropTypes from "prop-types";
import React, {useEffect} from "react";
import Swiper from "react-id-swiper";
import TestimonialOneSingle from "../../components/testimonial/TestimonialOneSingle";
import { getTestimonials } from "../../redux/actions/testimonialActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TestimonialOne = ({
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  bgColorClass
}) => {
  const dispatch = useDispatch();
  const testimonialData = useSelector((state: RootState) => state.testimonialData.testimonials)

  // swiper slider settings
  const settings = {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  };

  useEffect(() => {
    dispatch(getTestimonials());
  },[dispatch])

  return (
    <div
      className={`testimonial-area ${spaceTopClass ? spaceTopClass : ""}  ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${spaceLeftClass ? spaceLeftClass : ""}  ${
        spaceRightClass ? spaceRightClass : ""
      } ${bgColorClass ? bgColorClass : ""}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mb-50 ml-auto mr-auto">
            <div className="testimonial-active nav-style-1 nav-testi-style">
              <Swiper {...settings}>
                {testimonialData &&
                  testimonialData.length > 0 &&
                  testimonialData.map((single, key) => {
                    return (
                      <TestimonialOneSingle
                        data={single}
                        key={key}
                        sliderClass="swiper-slide"
                      />
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TestimonialOne.propTypes = {
  bgColorClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TestimonialOne;
