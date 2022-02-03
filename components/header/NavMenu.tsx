import React from "react";
import Link from "next/link";
import { multilanguage } from "redux-multilanguage";
import { useSelector } from "react-redux";
import { ThunderboltOutlined, CrownOutlined } from "@ant-design/icons";
import { RootState } from "../../redux/store";
import Image from "next/image";

type Iprops = {
  strings: any;
  menuWhiteClass: any;
  sidebarMenu: any;
};

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }: Iprops) => {
  const setting = useSelector((state: RootState) => state.settingData.setting);
  const categories = useSelector(
    (state: RootState) => state.commonData.categories
  );

  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link href={"/product"}>
              <>
                {" "}
                CATEGORIES
                {sidebarMenu ? (
                  <span>
                    <i className="fa fa-angle-right"></i>
                  </span>
                ) : (
                  <i className="fa fa-angle-down" />
                )}
              </>
            </Link>
            <ul className="mega-menu">
              <li>
                <ul>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((category: any) => (
                      <li key={category}>
                        {category && (
                          <Link href={"/menu?item=" + category}>
                            {category.toUpperCase()}
                          </Link>
                        )}
                      </li>
                    ))}
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-img">
                    <Link passHref={true} href={"/product"}>
                      <Image
                        priority
                        width={200}
                        height={300}
                        src={"/assets/img/nice-banner.png"}
                        alt="BANNER"
                      />
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <Link href={"/product"}>PRODUCTS</Link>
          </li>
          {setting && setting.is_campaign_sell && (
            <li className="campaign-products">
              <CrownOutlined twoToneColor="#a749ff" />{" "}
              <Link href={"/campaign"}>CAMPAIGN</Link>
            </li>
          )}
          {setting && setting.is_flash_sell && (
            <li className="flash-products">
              <ThunderboltOutlined /> <Link href={"/flash"}>FLASH SELL</Link>
            </li>
          )}
          <li>
            <Link href={"/blog"}>BLOG</Link>
          </li>
          <li>
            <Link href={"/contact"}>CONTACT</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default multilanguage(NavMenu);
