import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { getDiscountPrice } from "../helpers/product";
import { getOrderPayload } from "../helpers/checkout";
import { Form, Input, Button, Select, message } from "antd";
import * as address from "@bangladeshi/bangladesh-address";
import bdPhone from "@0devco/bd-phone-validator";
import * as orderApi from "../api/orderApi";
import { useSelector, useDispatch } from "react-redux";
import * as userApi from "../api/userApi";
import {FETCH_USER} from "../redux/actions/userActions";
import { RootState } from "../redux/store";
import { NextSeo } from "next-seo";

const Checkout = ({ location, cartItems, currency }) => {
  const SEO = {
    title: "Checkout | Kureghorbd",
    openGraph: {
      title: "Checkout | Kureghorbd",
    }
  }
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [district, setDistrict] = useState(undefined);
  const user = useSelector((state: RootState) => state.userData.user);
  const dispatch = useDispatch();

  let cartTotalPrice = 0;

  const onFinish = async (values) => {
    if (!values.phone) {
      form.setFields([
        {
          name: "phone",
          errors: ["Plese give correct phone number"],
        },
      ]);
      return;
    }

    const payload: any = getOrderPayload(cartItems, currency);
    payload.userAddress = values;

    setLoading(true);
    try {
      await orderApi.createNewOrder(payload);
      message.success("Order created sucessfully");
      form.resetFields();
      if(user) {
        const response = await userApi.getUser(user?._id);
        dispatch({
          type: FETCH_USER,
          payload: response
        });
      }
    } catch (e) {
      message.error("Something wen wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictSelect = (district) => {
    form.setFields([
      {
        name: "upazila",
        value: undefined,
      },
    ]);
    setDistrict(district);
  };

  const checkMobileNumber = (event) => {
    const number = event.target.value;
    if (!number) return;
    const info = bdPhone(number);
    if (info.core_valid && info.has_operator) {
      form.setFields([
        {
          name: "phone",
          errors: undefined,
        },
      ]);
    } else {
      form.setFields([
        {
          name: "phone",
          errors: ["Not correct number"],
        },
      ]);
    }
  };

  return (
    <Fragment>
      <NextSeo {...SEO} />
        <div className="checkout-area pt-40 pb-50">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Form
                initialValues={{
                  name: user?.name,
                  phone: user?.phone,
                  district: user?.district,
                  upazila: user?.upazila,
                  address: user?.address,
                }}
                name="checkout"
                layout="vertical"
                form={form}
                onFinish={onFinish}
                className="row"
              >
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                              {
                                required: true,
                                message: "Please input your name!",
                              },
                            ]}
                          >
                            <Input name="name" type="text" />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <Form.Item name="phone" label="Phone">
                            <Input
                              onChange={checkMobileNumber}
                              name="phone"
                              type="text"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <Form.Item
                            name="district"
                            label="District"
                            rules={[
                              {
                                required: true,
                                message: "Please select your city!",
                              },
                            ]}
                          >
                            <Select
                              onChange={handleDistrictSelect}
                              allowClear
                              showSearch
                            >
                              {address.allDistict().map((district) => (
                                <Select.Option key={district} value={district}>
                                  {district}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="billing-info mb-20">
                          <Form.Item
                            label="Upazila"
                            name="upazila"
                            rules={[
                              {
                                required: true,
                                message: "Please select your upazila!",
                              },
                            ]}
                          >
                            <Select allowClear showSearch>
                              {district &&
                                address.upazilasOf(district).map((item) => (
                                  <Select.Option
                                    key={item.upazila}
                                    value={item.upazila}
                                  >
                                    {item.upazila}
                                  </Select.Option>
                                ))}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <Form.Item
                            name="address"
                            label="Full Street Address(House number / street name etc)"
                            rules={[
                              {
                                required: true,
                                message: "Please input your address!",
                              },
                            ]}
                          >
                            <Input.TextArea />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <Form.Item
                          name="message"
                          label="Notes about your order, e.g. special notes for delivery. "
                        >
                          <Input.TextArea />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
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
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                          <br />
                          <ul>
                            <li className="order-total">Payment</li>
                            <li>
                              Cash On Delivery
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method">          
                      </div>
                    </div>
                    <div className="place-order mt-25">
                      <Button
                        loading={loading}
                        className="btn-hover"
                        type="primary"
                        htmlType="submit"
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link href={"/product"}>
                        Shop Now
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

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Checkout);
