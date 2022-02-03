import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { removeFromCompare } from "../redux/actions/compareActions";
import { getDiscountPrice } from "../helpers/product";
import Image from "next/image";
import { Rate } from "antd";
import { NextSeo } from "next-seo";

const Compare = ({
  cartItems,
  compareItems,
  addToCart,
  removeFromCompare,
  currency,
}) => {
  const SEO = {
    title: "Compare | Kureghorbd",
    openGraph: {
      title: "Compare | Kureghorbd",
    }
  }
  const { addToast } = useToasts();

  return (
    <Fragment>
      <NextSeo {...SEO} />
      <div className="compare-main-area pt-40 pb-50">
        <div className="container">
          {compareItems && compareItems.length >= 1 ? (
            <div className="row">
              <div className="col-lg-12">
                <div className="compare-page-content">
                  <div className="compare-table table-responsive">
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <th className="title-column">Product Info</th>
                          {compareItems.map((compareItem, key) => {
                            const cartItem = cartItems.filter(
                              (item) => item.id === compareItem.id
                            )[0];
                            return (
                              <td className="product-image-title" key={key}>
                                <div className="compare-remove">
                                  <button
                                    onClick={() =>
                                      removeFromCompare(compareItem, addToast)
                                    }
                                  >
                                    <i className="pe-7s-trash" />
                                  </button>
                                </div>
                                {compareItem &&
                                  compareItem.image &&
                                  compareItem.image[0] && (
                                    <Link
                                      passHref
                                      href={"/product/" + compareItem.id}
                                    >
                                      <Image
                                        className="img-fluid"
                                        src={compareItem.image[0]}
                                        alt="COMPARE"
                                        width={233}
                                        priority
                                        height={183}
                                      />
                                    </Link>
                                  )}
                                <div className="product-title">
                                  <Link href={"/product/" + compareItem.id}>
                                    {compareItem.name}
                                  </Link>
                                </div>
                                <div className="compare-btn">
                                  {compareItem.affiliateLink ? (
                                    <a
                                      href={compareItem.affiliateLink}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                    >
                                      {" "}
                                      Buy now{" "}
                                    </a>
                                  ) : compareItem.variation &&
                                    compareItem.variation.length >= 1 ? (
                                    <Link
                                      href={`/product/${compareItem.id}`}
                                    >
                                      Select Option
                                    </Link>
                                  ) : compareItem.stock &&
                                    compareItem.stock > 0 ? (
                                    <button
                                      onClick={() =>
                                        addToCart(compareItem, addToast)
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
                                        compareItem !== undefined
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
                                      Out of Stock
                                    </button>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <th className="title-column">Price</th>
                          {compareItems.map((compareItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              compareItem.price,
                              compareItem.discount
                            );
                            const finalProductPrice = (
                              compareItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);
                            return (
                              <td className="product-price" key={key}>
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
                            );
                          })}
                        </tr>

                        <tr>
                          <th className="title-column">Description</th>
                          {compareItems.map((compareItem, key) => {
                            return (
                              <td className="product-desc" key={key}>
                                <p>
                                  {compareItem.shortDescription
                                    ? compareItem.shortDescription
                                    : "N/A"}
                                </p>
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <th className="title-column">Rating</th>
                          {compareItems.map((compareItem, key) => {
                            return (
                              <td className="product-rating" key={key}>
                                <Rate value={compareItem.rating} />
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-shuffle"></i>
                  </div>
                  <div className="item-empty-area__text">
                    No items found in compare <br />{" "}
                    <Link href={process.env.PUBLIC_URL + "/product"}>
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

Compare.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  removeFromCompare: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    compareItems: state.compareData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },

    removeFromCompare: (item, addToast) => {
      dispatch(removeFromCompare(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
