import React from "react";
import Link from "next/link";
import { multilanguage } from "redux-multilanguage";
import { useSelector } from "react-redux";
import { ThunderboltOutlined, CrownOutlined } from "@ant-design/icons";
import { RootState } from "redux/store";
import { useRouter } from 'next/router'

type Iprops = {
  strings: any;
  menuWhiteClass: any;
  sidebarMenu: any;
};

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }: Iprops) => {
  const router = useRouter();
  const path = router.pathname;
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
                Categories
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
                            {category}
                          </Link>
                        )}
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </li>
          <li className={`${path === "/product" ? "active-menu" : ""}`}>
            <Link href={"/product"}>Products</Link>
          </li>
          {setting && setting.is_campaign_sell && (
            <li className={`${path === "/campaign" ? "active-menu" : ""} campaign-products`}>
              <CrownOutlined twoToneColor="#a749ff" />{" "}
              <Link href={"/campaign"}>Campaign</Link>
            </li>
          )}
          {setting && setting.is_flash_sell && (
            <li className={`${path === "/flash" ? "active-menu" : ""} flash-products`} >
              <ThunderboltOutlined /> <Link href={"/flash"}>Flash Sell</Link>
            </li>
          )}
          <li className={`${path === "/blog" ? "active-menu" : ""}`}>
            <Link href={"/blog"}>Blog</Link>
          </li>
          <li className={`${path === "/contact" ? "active-menu" : ""}`}>
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default multilanguage(NavMenu);
