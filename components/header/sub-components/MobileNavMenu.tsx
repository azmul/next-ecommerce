import React from "react";
import Link from "next/link";
import { multilanguage } from "redux-multilanguage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FETCH_USER, USER_TOKEN } from "../../../redux/actions/userActions";
import { RootState } from "../../../redux/store";
import Image from "next/image";

type Iprops = {
  strings: any;
};

const MobileNavMenu = ({ strings }: Iprops) => {
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
        <li>
          <Link href={"/product"}>PRODUCTS</Link>
        </li>
        {setting && setting.is_campaign_sell && (
          <li className="campaign-products">
            <Link href={"/campaign"}>CAMPAIGN</Link>
          </li>
        )}
        {setting && setting.is_flash_sell && (
          <li className="flash-products">
            <Link href={"/flash"}>FLASH SELL</Link>
          </li>
        )}
        <li className="menu-item-has-children">
          <Link href={"/blog"}>BLOG</Link>
        </li>
        <li>
          <Link href={"/contact"}>CONTACT</Link>
        </li>
        <li className="menu-item-has-children">
          <Link href={"/account"}>ACCOUNT</Link>
          <ul className="sub-menu">
            {!user && (
              <li>
                <Link href={"/login"}>LOGIN</Link>
              </li>
            )}
            {!user && (
              <li>
                <Link href={"/login"}>REGISTER</Link>
              </li>
            )}
            {user && (
              <li>
                <Link href={"/account"}>MY ACCOUNT</Link>
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
