import PropTypes from "prop-types";
import React from "react";
import Image from "next/image";

const TestimonialOneSingle = ({ data, sliderClass }) => {
  return (
    <div
      className={`single-testimonial text-center ${
        sliderClass ? sliderClass : ""
      }`}
    >
      <Image src={data.image} alt="TESTIMONIAL" width="150" height="100"/>
      <p>{data.content}</p>
      <div className="client-info">
        <i className="fa fa-map-signs" />
        <h5>{data.customer_name}</h5>
        <span>{data.title}</span>
      </div>
    </div>
  );
};

TestimonialOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default TestimonialOneSingle;
