import PropTypes from "prop-types";
import React, { Fragment } from "react";
import SectionTitleWithText from "../components/section-title/SectionTitleWithText";
import TextGridOne from "../wrappers/text-grid/TextGridOne";
import TeamMemberOne from "../wrappers/team-member/TeamMemberOne";
import { multilanguage } from "redux-multilanguage";

const About = ({ location , strings}) => {

  return (
    <Fragment>

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />

        {/* text grid */}
        <TextGridOne spaceBottomClass="pb-70" />

        {/* team member */}
        <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" />

    </Fragment>
  );
};

About.propTypes = {
  location: PropTypes.object,
  strings: PropTypes.object
};

export default multilanguage(About);
