import type { NextPage } from 'next'
import React, { Fragment, useState, useEffect, useCallback } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import {
  Form,
  Input,
  Button,
  message,
  Card as ACard,
  Row,
  Col,
  Divider,
  Select,
  Radio,
  DatePicker,
} from "antd";
import * as userApi from "../api/userApi";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_USER, USER_TOKEN } from "../redux/actions/userActions";
import moment from "moment";
import { DELIVERY } from "../constant/delivery";
import { DateFormats } from "../constant/date";
import { RootState } from "../redux/store";
import Image from "next/image";
import { getUser } from "../redux/actions/userActions";
import { usePrevious } from "../hooks/usePrevious";
import bdPhone from "@0devco/bd-phone-validator";
import * as address from "@bangladeshi/bangladesh-address";
import deepEqual from "fast-deep-equal";

const MyAccount: NextPage = () => {
  const [changePasswordForm] = Form.useForm();
  const [myAccountForm] = Form.useForm();
  const [district, setDistrict] = useState(undefined);

  const [isLoadingChangePassword, setLoadingChangePassword] = useState(false);
  const [isLoadingProfile, setLoadingProfile] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.userData.user);
  console.log(user);
  const orders = user?.orders || [];
  const prevUser = usePrevious(user);

  const onChangePasswordFinish = async (values: any) => {
    setLoadingChangePassword(true);
    try {
      await userApi.changePassword(values);
      changePasswordForm.resetFields();
      message.success("Password Changed sucessfully");
      dispatch({
        type: FETCH_USER,
        payload: null,
      });
      dispatch({
        type: USER_TOKEN,
        payload: false,
      });
      router.push("/");
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoadingChangePassword(false);
    }
  };

  const checkMobileNumber = (event: any) => {
    const number = event.target.value;
    if (!number) return;
    const info = bdPhone(number);
    if (info.core_valid && info.has_operator) {
      myAccountForm.setFields([
        {
          name: "phone",
          errors: undefined,
        },
      ]);
    } else {
      myAccountForm.setFields([
        {
          name: "phone",
          errors: ["Not correct number"],
        },
      ]);
    }
  };

  const handleDistrictSelect = (district: any) => {
    myAccountForm.setFields([
      {
        name: "upazila",
        value: undefined,
      },
    ]);
    setDistrict(district);
  };

  const onMyAccountFinish = async (values: any) => {
    if (!values.phone) {
      myAccountForm.setFields([
        {
          name: "phone",
          errors: ["Plese give correct phone number"],
        },
      ]);
      return;
    }
    try {
      values.birth_day = moment(values.birth_day).format(
        DateFormats.DAILY_FORMAT
      );
      setLoadingProfile(true);

      await userApi.updateProfile(values);
      message.success("Profile updated sucessfully");
      dispatch(getUser(user._id));
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    if (!deepEqual(user, prevUser)) {
      if(user && user._id) {
        dispatch(getUser(user._id));
      }
    }
  }, [dispatch, prevUser, user]);

  return (
    <Fragment>
      <div className="myaccount-area pb-80 pt-100">
        <div className="container">
          <div className="row">
            <div className="ml-auto mr-auto col-lg-9">
              <div className="myaccount-wrapper">
                <Accordion>
                  <Card className="single-my-account mb-20">
                    <Card.Header className="panel-heading">
                      <Accordion.Toggle eventKey="0">
                        <h3 className="panel-title">
                          <span>1 .</span> Edit your account information{" "}
                        </h3>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Form
                          initialValues={{
                            name: user?.name,
                            phone: user?.phone,
                            district: user?.district,
                            upazila: user?.upazila,
                            address: user?.address,
                            gender: user?.gender,
                            email: user?.email,
                            birth_day: user?.birth_day
                              ? moment(
                                  user?.birth_day,
                                  DateFormats.DAILY_FORMAT
                                )
                              : null,
                            post_code: user?.post_code,
                          }}
                          name="checkout"
                          layout="vertical"
                          form={myAccountForm}
                          onFinish={onMyAccountFinish}
                          className="row"
                        >
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>
                                Your Customer ID: <b>{user && user?.id}</b>
                              </h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
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
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <Form.Item name="phone" label="Phone">
                                    <Input
                                      onChange={checkMobileNumber}
                                      name="phone"
                                      type="text"
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
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
                                        <Select.Option
                                          key={district}
                                          value={district}
                                        >
                                          {district}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
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
                                        address
                                          .upazilasOf(district)
                                          .map((item) => (
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
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
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
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <Form.Item
                                    label="Post Code"
                                    name="post_code"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Pleasegive your post code",
                                      },
                                    ]}
                                  >
                                    <Input type="text" />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <Form.Item
                                    name="gender"
                                    label="Gender"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select a gender",
                                      },
                                    ]}
                                  >
                                    <Radio.Group>
                                      <Radio value="male">Male</Radio>
                                      <Radio value="female">Female</Radio>
                                      <Radio value="other">Other</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <Form.Item
                                    label="Birth Date"
                                    name="birth_day"
                                  >
                                    <DatePicker
                                      format={DateFormats.DAILY_FORMAT}
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <Form.Item label="Email" name="email">
                                    <Input placeholder="Email" type="email" />
                                  </Form.Item>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <Button
                                  className="btn-hover"
                                  type="primary"
                                  htmlType="submit"
                                  loading={isLoadingProfile}
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="single-my-account mb-20">
                    <Card.Header className="panel-heading">
                      <Accordion.Toggle eventKey="1">
                        <h3 className="panel-title">
                          <span>2 .</span> Change your password
                        </h3>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <Form
                          layout="vertical"
                          form={changePasswordForm}
                          onFinish={onChangePasswordFinish}
                          className="myaccount-info-wrapper"
                        >
                          <div className="account-info-wrapper">
                            <h4>Change Password</h4>
                            <h5>Your Password</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <Form.Item
                                  name="current"
                                  label="Password"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Provide your current password",
                                    },
                                  ]}
                                >
                                  <Input.Password />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <Form.Item
                                  name="password"
                                  label="New Password"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Provide your new password",
                                    },
                                  ]}
                                >
                                  <Input.Password />
                                </Form.Item>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <Form.Item
                                  name="confirm"
                                  label="Confirm Password"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Provide your confirm password",
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(_, value) {
                                        if (
                                          !value ||
                                          getFieldValue("password") === value
                                        ) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(
                                          new Error("Password Mismatch")
                                        );
                                      },
                                    }),
                                  ]}
                                >
                                  <Input.Password />
                                </Form.Item>
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <Button
                                type="primary"
                                loading={isLoadingChangePassword}
                                htmlType="submit"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </Form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card className="single-my-account mb-20">
                    <Card.Header className="panel-heading">
                      <Accordion.Toggle eventKey="2">
                        <h3 className="panel-title">
                          <span>3 .</span> Order History
                        </h3>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Orders</h4>
                          </div>
                          {orders.reverse().length > 0 ? (
                            <>
                              {orders.map((order) => (
                                <div key={order.id} className="row orders">
                                  <div className="col-lg-12 col-md-12">
                                    <ACard
                                      title={`Order ID: #${order.id}`}
                                      extra={
                                        <div>
                                          Placed on: <br />
                                          {moment(order.createdAt).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                          )}
                                        </div>
                                      }
                                    >
                                      <div className="delivery">
                                        <Row justify="end">
                                          <Col sm={12} xs={12}>
                                            Expected delivery: <br />
                                            As per delivery policy
                                          </Col>
                                          <Col sm={8} xs={12}>
                                            Total: {order.cartTotalPrice}/=
                                          </Col>
                                          <Col sm={4} xs={12}>
                                            {order.shippingStatus ===
                                              DELIVERY.PENDING && (
                                              <b style={{ color: "blue" }}>
                                                Pending
                                              </b>
                                            )}
                                            {order.shippingStatus ===
                                              DELIVERY.CHECKING && (
                                              <b style={{ color: "black" }}>
                                                Checking
                                              </b>
                                            )}
                                            {order.shippingStatus ===
                                              DELIVERY.PROCESSING && (
                                              <b style={{ color: "orange" }}>
                                                Processing
                                              </b>
                                            )}
                                            {order.shippingStatus ===
                                              DELIVERY.SHIPPED && (
                                              <b style={{ color: "green" }}>
                                                Shipped
                                              </b>
                                            )}
                                            {order.shippingStatus ===
                                              DELIVERY.DELIVERED && (
                                              <b style={{ color: "green" }}>
                                                Delivered
                                              </b>
                                            )}
                                            {order.shippingStatus ===
                                              DELIVERY.CANCELED && (
                                              <b style={{ color: "red" }}>
                                                Canceled
                                              </b>
                                            )}
                                          </Col>
                                        </Row>
                                      </div>
                                      {order.products &&
                                        order.products.map((product) => (
                                          <div
                                            key={product._id}
                                            className="product"
                                          >
                                            <Row justify="center">
                                              <Col sm={2} xs={12}>
                                                {product &&
                                                  product.image &&
                                                  product.image[0] && (
                                                    <Image
                                                      alt="PRODUCT_IMAGE"
                                                      width={50}
                                                      height={50}
                                                      src={
                                                        product &&
                                                        product.image &&
                                                        product.image[0]
                                                      }
                                                      layout="responsive"
                                                    />
                                                  )}
                                              </Col>
                                              <Divider type="vertical" />
                                              <Col sm={7} xs={12}>
                                                Product 1: <br />
                                                {product.name}
                                              </Col>
                                              <Divider type="vertical" />
                                              <Col sm={4} xs={12}>
                                                Discount: {product.discount}৳
                                              </Col>
                                              <Divider type="vertical" />
                                              <Col sm={4} xs={12}>
                                                Price: {product.price}৳
                                              </Col>
                                              <Divider type="vertical" />
                                              <Col sm={2} xs={12}>
                                                Color:{" "}
                                                {product.selectedProductColor
                                                  ? product.selectedProductColor
                                                  : "---"}
                                              </Col>
                                              <Divider type="vertical" />
                                              <Col sm={2} xs={12}>
                                                Size:{" "}
                                                {product.selectedProductSize
                                                  ? product.selectedProductSize
                                                  : "---"}
                                              </Col>
                                              <Divider type="vertical" />
                                              <Col sm={2} xs={12}>
                                                Qnt: <br />
                                                {product.quantity}
                                              </Col>
                                            </Row>
                                          </div>
                                        ))}
                                    </ACard>
                                  </div>
                                </div>
                              ))}{" "}
                            </>
                          ) : (
                            <div>No Order</div>
                          )}
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyAccount;
