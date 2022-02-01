import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Kureghor</h1>
          <p>
            Kureghor.com is the largest online shopping site in Bangladesh.
            Organized in September 2011, this Business to Customer site has
            earlier developed into an established marketplace for both sellers &
            customers. Now, Kureghor is the most famous online shopping
            marketplace in the country of Bangladesh. Kureghor direction to be
            the people’s marketplace; that’s why Kureghor has both high-priced
            branded goods together with low-priced non-branded goods on
            Kureghor website.
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
