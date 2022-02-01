import PropTypes from "prop-types";
import React from "react";
import Image from "next/image";

const FeatureIconSingle = ({ singleFeature }) => {
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="support-wrap mb-30">
        <div className="support-icon">
          <Image
            className="animated"
            src={singleFeature.image}
            alt=""
            width="80"
            height="60"
            layout="responsive"
          />
        </div>
        <div className="support-content">
          <h5>{singleFeature.title}</h5>
          <p>{singleFeature.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

FeatureIconSingle.propTypes = {
  singleFeature: PropTypes.object
};

export default FeatureIconSingle;
