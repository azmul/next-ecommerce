import type { NextPage } from 'next'
import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, PhoneOutlined, LockOutlined } from "@ant-design/icons";
import bdPhone from '@0devco/bd-phone-validator'
import * as userApi from "api/userApi";
import { useDispatch } from 'react-redux'
import {FETCH_USER, USER_TOKEN} from "redux/actions/userActions";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const LoginRegister: NextPage = () => {
  const SEO = {
    title: "Login | Kureghorbd",
    openGraph: {
      title: "Login | Kureghorbd",
    }
  }

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useRouter();

  const onFinishLogin = async (values) => {
    if(!values.phone) {
      loginForm.setFields([
        {
          name: 'phone',
          errors: ["Plese give correct phone number"]
        }
      ])
      return;
    }
    setLoading(true);
    try {
      const response = await userApi.loginUser(values);
      dispatch({
        type: FETCH_USER,
        payload: response.data
      });
      dispatch({
        type: USER_TOKEN,
        payload: response.token
      });
      message.success("Login sucessfully");
      history.push("/");
    } catch (e) {
      message.error(e.message);
    }finally{
      setLoading(false);
    }
  };

  const onFinishRegister = async (values) => {
    if(!values.phone) {
      registerForm.setFields([
        {
          name: 'phone',
          errors: ["Plese give correct phone number"]
        }
      ])
      return;
    }
    setLoading(true);
    try {
      await userApi.registerUser(values);
      registerForm.resetFields();
      message.success("Registered sucessfully");
    } catch (e) {
      message.error(e.message)
    }finally{
      setLoading(false);
    }
  };

  const checkLoginMobileNumber= (event) => {
    const number = event.target.value;
    if(!number) return;
    const info = bdPhone(number);
    if (info.core_valid && info.has_operator) {
      loginForm.setFields([
        {
          name: 'phone',
          errors: undefined
        }
      ])
    } else {
      loginForm.setFields([
        {
          name: 'phone',
          errors: ["Not correct number"]
        }
      ])
    }
  }

  const checkRegisterMobileNumber= (event) => {
    const number = event.target.value;
    if(!number) return;
    const info = bdPhone(number);
    if (info.core_valid && info.has_operator) {
      registerForm.setFields([
        {
          name: 'phone',
          errors: undefined
        }
      ])
    } else {
      registerForm.setFields([
        {
          name: 'phone',
          errors: ["Not correct number"]
        }
      ])
    }
  }

  return (
    <div id="page">
<NextSeo {...SEO} />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <Form
                          name="normal_login"
                          className="login-form"
                          initialValues={{ remember: true }}
                          onFinish={onFinishLogin}
                          form={loginForm}
                        >
                          <Form.Item
                            name="phone"
                          >
                            <Input
                              prefix={
                                <PhoneOutlined className="site-form-item-icon" />
                              }
                              placeholder="Phone"
                              onChange={checkLoginMobileNumber}  
                            />
                          </Form.Item>
                          <Form.Item
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Password!",
                              },
                            ]}
                          >
                            <Input.Password
                              prefix={
                                <LockOutlined className="site-form-item-icon" />
                              }
                              type="password"
                              placeholder="Password"
                            />
                          </Form.Item>
                          <Form.Item>
                            <Form.Item
                              name="remember"
                              valuePropName="checked"
                              noStyle
                            >
                              <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                          </Form.Item>

                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form-button"
                              size="large"
                              loading={loading}
                            >
                              Log in
                            </Button>
                          </Form.Item>
                        </Form>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <Form
                          name="normal_login"
                          className="login-form"
                          initialValues={{ remember: true }}
                          onFinish={onFinishRegister}
                          form={registerForm}
                        >
                        <Form.Item
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Name!",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <UserOutlined className="site-form-item-icon" />
                              }
                              placeholder="Name"
                            />
                          </Form.Item>
                          <Form.Item
                            name="phone"
                          >
                            <Input
                              prefix={
                                <PhoneOutlined className="site-form-item-icon" />
                              }
                              placeholder="Phone"
                              onChange={checkRegisterMobileNumber}  
                            />
                          </Form.Item>
                          <Form.Item
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your Password!",
                              },
                            ]}
                          >
                            <Input.Password
                              prefix={
                                <LockOutlined className="site-form-item-icon" />
                              }
                              type="password"
                              placeholder="Password"
                            />
                          </Form.Item>

                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form-button"
                              size="large"
                              loading={loading}
                            >
                              Register
                            </Button>
                          </Form.Item>
                        </Form>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default LoginRegister;
