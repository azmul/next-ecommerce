import type { NextPage } from 'next'
import React, { useState } from "react";
import LocationMap from "components/contact/LocationMap";
import { Form, Input, Button } from "antd";
import * as contactApi from "api/contactApi";
import { toast } from "react-toastify";
import bdPhone from "@0devco/bd-phone-validator";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { NextSeo } from "next-seo";

const Contact: NextPage = () => {
  const SEO = {
    title: "Contact | Kureghorbd",
    openGraph: {
      title: "Contact | Kureghorbd",
    }
  }
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const setting = useSelector((state: RootState) => state.settingData.setting);

  const onFinish = async (values: any) => {
    if (!values.phone) {
      form.setFields([
        {
          name: "phone",
          errors: ["Plese give correct phone number"],
        },
      ]);
      return;
    }
    setLoading(true);
    try {
      await contactApi.sendMessage(values);
      form.resetFields();
      toast.success("Message send sucessfully");
    } catch (e) {
      toast.error("Message not send");
    } finally {
      setLoading(false);
    }
  };

  const checkMobileNumber = (event: any) => {
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
    <div id="page">
      <NextSeo {...SEO} />
        <div className="contact-area pt-50 pb-100">
          <div className="container">
            <div className="contact-map mb-10">
              <LocationMap latitude="23.2156112" longitude="89.1269443" />
            </div>
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      {setting && setting.contact_number1 && (
                        <p>{setting.contact_number1}</p>
                      )}
                      {setting && setting.contact_number2 && (
                        <p>{setting.contact_number2}</p>
                      )}
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      {setting && setting.business_email && (
                        <p>
                          <a href={`mailto:${setting.business_email}`}>
                            {setting.business_email}
                          </a>
                        </p>
                      )}

                      {setting && setting.business_site && (
                        <p>
                          <a href={`${setting.business_site}`}>
                            {setting.business_site}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Address goes here, </p>
                      {setting && setting.business_main_address && (
                        <p>{setting.business_main_address}</p>
                      )}
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      {setting && setting.facebook_link && (
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={setting.facebook_link}
                          >
                            <i className="fa fa-facebook" />
                          </a>
                        </li>
                      )}
                      {setting && setting.twitter_link && (
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={setting.twitter_link}
                          >
                            <i className="fa fa-twitter" />
                          </a>
                        </li>
                      )}
                      {setting && setting.youtube_link && (
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={setting.youtube_link}
                          >
                            <i className="fa fa-youtube" />
                          </a>
                        </li>
                      )}
                      {setting && setting.pinterest_link && (
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={setting.pinterest_link}
                          >
                            <i className="fa fa-pinterest-p" />
                          </a>
                        </li>
                      )}
                      {setting && setting.instagram_link && (
                        <li>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={setting.instagram_link}
                          >
                            <i className="fa fa-tumblr" />
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <Form
                    form={form}
                    onFinish={onFinish}
                    className="contact-form-style"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <Form.Item
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input name="name" placeholder="Name*" type="text" />
                        </Form.Item>
                      </div>
                      <div className="col-lg-6">
                        <Form.Item name="phone">
                          <Input
                            onChange={checkMobileNumber}
                            name="phone"
                            placeholder="Phone*"
                            type="text"
                          />
                        </Form.Item>
                      </div>
                      <div className="col-lg-12">
                        <Form.Item
                          name="subject"
                          rules={[
                            {
                              required: true,
                              message: "Please input your subject!",
                            },
                          ]}
                        >
                          <Input
                            name="subject"
                            placeholder="Subject*"
                            type="text"
                          />
                        </Form.Item>
                      </div>
                      <div className="col-lg-12">
                        <Form.Item
                          name="message"
                          rules={[
                            {
                              required: true,
                              message: "Please input your message!",
                            },
                          ]}
                        >
                          <Input.TextArea
                            name="message"
                            placeholder="Your Massege*"
                          />
                        </Form.Item>
                        <Button
                          loading={loading}
                          type="primary"
                          htmlType="submit"
                        >
                          SEND
                        </Button>
                      </div>
                    </div>
                  </Form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};


export default Contact;
