import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { getDiscountPrice } from "helpers/product";
import {
  addToCart,
  decrementQty,
  removeFromCart,
  cartItemStock,
  removeAllFromCart,
} from "redux/actions/cartActions";
import Image from "next/image";
import { NextSeo } from "next-seo";

const Cart = ({
  cartItems,
  currency,
  decrementQty,
  addToCart,
  removeFromCart,
  removeAllFromCart,
}) => {
  const SEO = {
    title: "Cart | Kureghorbd",
    openGraph: {
      title: "Cart | Kureghorbd",
    }
  }
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  let cartTotalPrice = 0;

  return (
    <Fragment>
      <NextSeo {...SEO} />
      <div className="cart-main-area pt-40 pb-50">
        <div className="container">
          {cartItems && cartItems.length >= 1 ? (
            <Fragment>
              <h3 className="cart-page-title">Your cart items</h3>
              <div className="row">
                <div className="col-12">
                  <div className="table-content table-responsive cart-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((cartItem, key) => {
                          const discountedPrice: any = getDiscountPrice(
                            cartItem.price,
                            cartItem.discount
                          );
                          const finalProductPrice: any = (
                            cartItem.price * currency.currencyRate
                          ).toFixed(2);
                          const finalDiscountedPrice: any = (
                            discountedPrice * currency.currencyRate
                          ).toFixed(2);

                          discountedPrice != null
                            ? (cartTotalPrice +=
                                finalDiscountedPrice * cartItem.quantity)
                            : (cartTotalPrice +=
                                finalProductPrice * cartItem.quantity);
                          return (
                            <tr key={key}>
                              <td className="product-thumbnail">
                                {cartItem &&
                                  cartItem.image &&
                                  cartItem.image[0] && (
                                    <Link
                                      passHref
                                      href={"/product/" + cartItem.id}
                                    >
                                      <Image
                                        className="img-fluid"
                                        src={cartItem.image[0]}
                                        alt=""
                                        width={232}
                                        height={182}
                                        priority
                                      />
                                    </Link>
                                  )}
                              </td>

                              <td className="product-name">
                                <Link
                                  href={
                                    "/product/" +
                                    cartItem.id
                                  }
                                >
                                  {cartItem.name}
                                </Link>
                                {cartItem.selectedProductColor &&
                                cartItem.selectedProductSize ? (
                                  <div className="cart-item-variation">
                                    <span>
                                      Color: {cartItem.selectedProductColor}
                                    </span>
                                    <span>
                                      Size: {cartItem.selectedProductSize}
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </td>

                              <td className="product-price-cart">
                                {discountedPrice !== null ? (
                                  <Fragment>
                                    <span className="amount old">
                                      {currency.currencySymbol +
                                        finalProductPrice}
                                    </span>
                                    <span className="amount">
                                      {currency.currencySymbol +
                                        finalDiscountedPrice}
                                    </span>
                                  </Fragment>
                                ) : (
                                  <span className="amount">
                                    {currency.currencySymbol +
                                      finalProductPrice}
                                  </span>
                                )}
                              </td>

                              <td className="product-quantity">
                                <div className="cart-plus-minus">
                                  <button
                                    className="dec qtybutton"
                                    onClick={() =>
                                      decrementQty(cartItem, addToast)
                                    }
                                  >
                                    -
                                  </button>
                                  <input
                                    className="cart-plus-minus-box"
                                    type="text"
                                    value={cartItem.quantity}
                                    readOnly
                                  />
                                  <button
                                    className="inc qtybutton"
                                    onClick={() =>
                                      addToCart(
                                        cartItem,
                                        addToast,
                                        quantityCount
                                      )
                                    }
                                    disabled={
                                      cartItem !== undefined &&
                                      cartItem.quantity &&
                                      cartItem.quantity >=
                                        cartItemStock(
                                          cartItem,
                                          cartItem.selectedProductColor,
                                          cartItem.selectedProductSize
                                        )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                {discountedPrice !== null
                                  ? currency.currencySymbol +
                                    (
                                      finalDiscountedPrice * cartItem.quantity
                                    ).toFixed(2)
                                  : currency.currencySymbol +
                                    (
                                      finalProductPrice * cartItem.quantity
                                    ).toFixed(2)}
                              </td>

                              <td className="product-remove">
                                <button
                                  onClick={() =>
                                    removeFromCart(cartItem, addToast)
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="cart-shiping-update-wrapper">
                    <div className="cart-shiping-update">
                      <Link href={"/product"}>Continue Shopping</Link>
                    </div>
                    <div className="cart-clear">
                      <button onClick={() => removeAllFromCart(addToast)}>
                        Clear Shopping Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {/* <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div> */}

                <div className="col-lg-4 col-md-12">
                  <div className="grand-totall">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Cart Total
                      </h4>
                    </div>
                    <h5>
                      Total products{" "}
                      <span>
                        {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                      </span>
                    </h5>

                    <h4 className="grand-totall-title">
                      Grand Total{" "}
                      <span>
                        {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                      </span>
                    </h4>
                    <Link href={"/checkout"}>Proceed to Checkout</Link>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-cart"></i>
                  </div>
                  <div className="item-empty-area__text">
                    No items found in cart <br />{" "}
                    <Link href={"/product"}>Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decrementQty: PropTypes.func,
  removeAllFromCart: PropTypes.func,
  removeFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decrementQty: (item, addToast) => {
      dispatch(decrementQty(item, addToast));
    },
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast));
    },
    removeAllFromCart: (addToast) => {
      dispatch(removeAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
