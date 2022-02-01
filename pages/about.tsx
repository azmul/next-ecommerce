import type { NextPage } from "next";
import React, { Fragment } from "react";
import SectionTitleWithText from "../components/section-title/SectionTitleWithText";
import TextGridOne from "../wrappers/text-grid/TextGridOne";
import TeamMemberOne from "../wrappers/team-member/TeamMemberOne";
import { multilanguage } from "redux-multilanguage";
import { NextSeo } from "next-seo";

const About: NextPage = () => {
  const SEO = {
    title: `Kureghor Ecommerce | About Page`,
    description:
      "Kureghor.com is the largest online shopping site in Bangladesh. Organized in September 2011, this Business to Customer site has earlier developed into an established marketplace for both sellers & customers. Now, Kureghor is the most famous online shopping marketplace in the country of Bangladesh. Kureghor direction to be the people’s marketplace; that’s why Kureghor has both high-priced branded goods together with low-priced non-branded goods on Kureghor website.",
    openGraph: {
      title: `Kureghor Ecommerce | About Page`,
      description:
        "Kureghor.com is the largest online shopping site in Bangladesh. Organized in September 2011, this Business to Customer site has earlier developed into an established marketplace for both sellers & customers. Now, Kureghor is the most famous online shopping marketplace in the country of Bangladesh. Kureghor direction to be the people’s marketplace; that’s why Kureghor has both high-priced branded goods together with low-priced non-branded goods on Kureghor website.",
    },
  };

  return (
    <Fragment>
      <NextSeo {...SEO} />
      {/* section title with text */}
      <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />

      {/* text grid */}
      <TextGridOne spaceBottomClass="pb-70" />

      {/* team member */}
      <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" />
    </Fragment>
  );
};

export default multilanguage(About);
