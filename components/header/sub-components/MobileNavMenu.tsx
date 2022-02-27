import React from "react";
import Link from "next/link";
import { multilanguage } from "redux-multilanguage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FETCH_USER, USER_TOKEN } from "redux/actions/userActions";
import { RootState } from "redux/store";
import Image from "next/image";
import { useRouter } from 'next/router'
import { ThunderboltOutlined, CrownOutlined } from "@ant-design/icons";

type Iprops = {
  strings: any;
};

const MobileNavMenu = ({ strings }: Iprops) => {
  const router = useRouter();
  const path = router.pathname;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userData.user);
  const setting = useSelector((state: RootState) => state.settingData.setting);
  const categories = useSelector(
    (state: RootState) => state.commonData.categories
  );

  const handleLogout = () => {
    dispatch({
      type: FETCH_USER,
      payload: null,
    });
    dispatch({
      type: USER_TOKEN,
      payload: false,
    });
  };
  return (
    <div className="offcanvas-navigation" id="offcanvas-navigation">
      {user && user.picture_url ? (
        <Image
          priority
          width={20}
          height={20}
          src={user.picture_url}
          alt="PROFILE"
        />
      ) : (
        <i className="pe-7s-user-female" />
      )}

      <ul>
        <li className="menu-item-has-children">
          <Link href={"/product"}>Categories</Link>
          <ul className="sub-menu">
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
        <li className="menu-item-has-children">
          <Link href={"/account"}>Account</Link>
          <ul className="sub-menu">
            {!user && (
              <li className={`${path === "/login" ? "active-menu" : ""}`}>
                <Link href={"/login"}>Login</Link>
              </li>
            )}
            {!user && (
              <li className={`${path === "/login" ? "active-menu" : ""}`}>
                <Link href={"/login"}>Register</Link>
              </li>
            )}
            {user && (
              <li className={`${path === "/account" ? "active-menu" : ""}`}>
                <Link href={"/account"}>My Account</Link>
              </li>
            )}
            {user && (
              <li>
                <a href={"/"} onClick={handleLogout}>
                  LOGOUT
                </a>
              </li>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default multilanguage(MobileNavMenu);
