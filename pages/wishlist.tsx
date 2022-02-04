import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Link  from "next/link";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { getDiscountPrice } from "../helpers/product";
import {
  addToWishlist,
  removeFromWishlist,
  removeAllFromWishlist,
} from "../redux/actions/wishlistActions";
import { addToCart } from "../redux/actions/cartActions";
import Image from "next/image";
import { NextSeo } from "next-seo";

const Wishlist = ({
  location,
  cartItems,
  currency,
  addToCart,
  wishlistItems,
  removeFromWishlist,
  removeAllFromWishlist,
}) => {
  const SEO = {
    title: "Whislist | Kureghorbd",
    openGraph: {
      title: "Whislist | Kureghorbd",
    }
  }
  const { addToast } = useToasts();

  return (
    <Fragment>
      <NextSeo {...SEO} />
      <div className="cart-main-area pt-90 pb-100">
        <div className="container">
          {wishlistItems && wishlistItems.length >= 1 ? (
            <Fragment>
              <h3 className="cart-page-title">Your wishlist items</h3>
              <div className="row">
                <div className="col-12">
                  <div className="table-content table-responsive cart-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Add To Cart</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlistItems.map((wishlistItem, key) => {
                          const discountedPrice = getDiscountPrice(
                            wishlistItem.price,
                            wishlistItem.discount
                          );
                          const finalProductPrice = (
                            wishlistItem.price * currency.currencyRate
                          ).toFixed(2);
                          const finalDiscountedPrice = (
                            discountedPrice * currency.currencyRate
                          ).toFixed(2);
                          const cartItem = cartItems.filter(
                            (item) => item.id === wishlistItem.id
                          )[0];
                          return (
                            <tr key={key}>
                              <td className="product-thumbnail">
                                {wishlistItem &&
                                  wishlistItem.image &&
                                  wishlistItem.image[0] && (
                                    <Link
                                      passHref
                                      href={
                                        "/product/" +
                                        wishlistItem.id
                                      }
                                    >
                                      <Image
                                        className="img-fluid"
                                        src={wishlistItem.image[0]}
                                        layout="responsive"
                                        alt="WHISLIST"
                                        width={234}
                                        height={184}
                                        priority
                                      />
                                    </Link>
                                  )}
                              </td>

                              <td className="product-name text-center">
                                <Link
                                  href={
                                    "/product/" +
                                    wishlistItem.id
                                  }
                                >
                                  {wishlistItem.name}
                                </Link>
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

                              <td className="product-wishlist-cart">
                                {wishlistItem.affiliateLink ? (
                                  <a
                                    href={wishlistItem.affiliateLink}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                  >
                                    {" "}
                                    Buy now{" "}
                                  </a>
                                ) : wishlistItem.variation &&
                                  wishlistItem.variation.length >= 1 ? (
                                  <Link
                                    href={`/product/${wishlistItem.id}`}
                                  >
                                    Select option
                                  </Link>
                                ) : wishlistItem.stock &&
                                  wishlistItem.stock > 0 ? (
                                  <button
                                    onClick={() =>
                                      addToCart(wishlistItem, addToast)
                                    }
                                    className={
                                      cartItem !== undefined &&
                                      cartItem.quantity > 0
                                        ? "active"
                                        : ""
                                    }
                                    disabled={
                                      cartItem !== undefined &&
                                      cartItem.quantity > 0
                                    }
                                    title={
                                      wishlistItem !== undefined
                                        ? "Added to cart"
                                        : "Add to cart"
                                    }
                                  >
                                    {cartItem !== undefined &&
                                    cartItem.quantity > 0
                                      ? "Added"
                                      : "Add to cart"}
                                  </button>
                                ) : (
                                  <button disabled className="active">
                                    Out of stock
                                  </button>
                                )}
                              </td>

                              <td className="product-remove">
                                <button
                                  onClick={() =>
                                    removeFromWishlist(wishlistItem, addToast)
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
                      <Link href={"/product"}>
                        Continue Shopping
                      </Link>
                    </div>
                    <div className="cart-clear">
                      <button onClick={() => removeAllFromWishlist(addToast)}>
                        Clear Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-like"></i>
                  </div>
                  <div className="item-empty-area__text">
                    No items found in wishlist <br />{" "}
                    <Link href={"/product"}>
                      Add Items
                    </Link>
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

Wishlist.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  removeAllFromWishlist: PropTypes.func,
  removeFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    removeFromWishlist: (item, addToast) => {
      dispatch(removeFromWishlist(item, addToast));
    },
    removeAllFromWishlist: (addToast) => {
      dispatch(removeAllFromWishlist(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
