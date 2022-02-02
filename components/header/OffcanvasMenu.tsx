import React from "react";
import Link  from "next/link";
import HeaderSocial from "./sub-components/HeaderSocial";
import NavMenu from "./NavMenu";
import Image from "next/image";

type Iprops = {
  activeState: any;
  getActiveState: any;
}

const OffcanvasMenu = ({ activeState, getActiveState }: Iprops) => {
  return (
    <div className={`clickable-mainmenu ${activeState ? "inside" : ""}`}>
      <div className="clickable-mainmenu-icon">
        <button
          className="clickable-mainmenu-close"
          onClick={() => getActiveState(false)}
        >
          <span className="pe-7s-close"></span>
        </button>
      </div>
      <div className="side-logo">
        <Link passHref={true}href={"/"}>
          <Image
            alt="Logo"
            width={300}
            height={300}
            src={"/img/logo.png"}
            priority
          />
        </Link>
      </div>
      {/* nav menu*/}
      <NavMenu sidebarMenu={true} />

      {/* header social */}
      <HeaderSocial />
    </div>
  );
};

export default OffcanvasMenu;
