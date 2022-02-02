import PropTypes from "prop-types";
import React from "react";
import Link  from "next/link";
import Image from "next/image";

type Iprops = {
  footerLogo: any;
  spaceBottomClass: any;
};

const FooterCopyright = ({ footerLogo, spaceBottomClass }: Iprops) => {
  return (
    <div className={`copyright ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="footer-logo">
        <Link passHref={true}href={"/"}>
          <Image width={100} priority height={80} alt="FooterLOGO" src={footerLogo} />
        </Link>
      </div>
      <p>
        © 2022{" "}
        <a href="//hasthemes.com" rel="noopener noreferrer" target="_blank">
          Kureghor
        </a>
        .<br /> All Rights Reserved
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default FooterCopyright;
