import React, { useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { removeFromCart } from "redux/actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_USER, USER_TOKEN } from "redux/actions/userActions";
import { SEARCH_STRING } from "redux/actions/commonActions";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/router";
import { RootState } from "redux/store";

type Iprops = {
  currency?: any;
  cartData?: any;
  wishlistData?: any;
  compareData?: any;
  removeFromCart?: any;
  iconWhiteClass?: any;
};

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  removeFromCart,
  iconWhiteClass,
}: Iprops) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user: any = useSelector((state: RootState) => state.userData.user);
  const [form] = Form.useForm();

  const handleClick = (e: any) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const page: any = document.querySelector("#page");
    const header: any = document.querySelector("#headerSection");
    const footer: any = document.querySelector("#footerSection");
    const offcanvasMobileMenu: any = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
    page.classList.add("background-modal");
    header.classList.add("background-modal");
    footer.classList.add("background-modal");
  };

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

  const onSearch = (values: any) => {
    if (values && values.search) {
      setLoading(true);
      dispatch({
        type: SEARCH_STRING,
        payload: values.search,
      });
      router.push("/search");
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      return;
    }
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <Form form={form} onFinish={onSearch} className="contact-form-style">
            <Form.Item
              name="search"
              style={{ marginBottom: "10px" }}
              rules={[
                {
                  required: true,
                  message: "Type text for search",
                },
              ]}
            >
              <Input placeholder="Search" type="text" />
            </Form.Item>
            <Button
              loading={loading}
              style={{
                width: "100%",
                height: "40px",
                backgroundColor: "#a749ff",
              }}
              type="primary"
              htmlType="submit"
            >
              <i
                style={{ fontWeight: "bold", color: "white" }}
                className="pe-7s-search"
              />
            </Button>
          </Form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        {user ? (
          <button
            className="account-setting-active"
            onClick={(e) => handleClick(e)}
          >
            <i className="pe-7s-user-female" />
          </button>
        ) : (
          <button className="account-setting-active">
            <Link passHref href={"/login"}>
              <span className="login-register-font">LOGIN/REGISTER</span>
            </Link>
          </button>
        )}
        {user && (
          <div className="account-dropdown">
            <ul>
              <li>
                <Link href={"/account"}>MY ACCOUNT</Link>
              </li>
              <li>
                <a href={"/"} onClick={handleLogout}>
                  LOGOUT
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="same-style header-compare">
        <Link passHref={true} href={"/compare"}>
          <i className="pe-7s-shuffle" />
        </Link>
        <span className="count-style">
          {compareData && compareData.length ? compareData.length : 0}
        </span>
      </div>
      <div className="same-style header-wishlist">
        <Link passHref={true} href={"/wishlist"}>
          <i className="pe-7s-like" />
        </Link>
        <span className="count-style">
          {wishlistData && wishlistData.length ? wishlistData.length : 0}
        </span>
      </div>
      <div className="same-style cart-wrap d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          removeFromCart={removeFromCart}
        />
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFromCart: (item: any, addToast: any) => {
      dispatch(removeFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
