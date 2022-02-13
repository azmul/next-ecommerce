import React, { useState, useEffect, useCallback } from "react";
import {
  Comment,
  Avatar,
  Form,
  Button,
  Input,
  Row,
  Col,
  Popconfirm,
  Rate,
  Spin,
  message,
} from "antd";
import { useSelector } from "react-redux";
import Link from "next/link";
import moment from "moment";
import { capitalize, remove } from "lodash";
import { UserOutlined } from "@ant-design/icons";
import { numericCode } from "numeric-code";
import { Endpoints } from "api/apiConst";
import { api } from "api/apiHelper";
import { RootState } from "redux/store";

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
        className="btn-hover"
      >
        Add Review
      </Button>
    </Form.Item>
  </>
);
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const ProductReview = ({ reviews }) => {
  const user = useSelector((state: RootState) => state.userData.user);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [rating, setRating] = useState(5);
  const [list, setLoadList] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    if (!value) {
      return;
    }
    const payload = {
      id: numericCode(6),
      message: value,
      rating,
      customerPhone: user.phone,
      customerName: user.name,
    };
    const newItems = [...list];
    newItems.unshift(payload);
    setLoadList(newItems);
    try {
      setSubmitting(true);
      await api.patch(`${Endpoints.REVIEW}/${reviews._id}`, {
        ...payload,
      });
      setValue("");
      message.success("Review Added successfully");
    } finally {
      setSubmitting(false);
    }
  };
  const handleRateChange = (value) => {
    setRating(value);
  };

  const deleteReview = useCallback(
    async (review) => {
      if (!reviews) return;
      try {
        const payload = {
          id: review.id,
          isDeleted: true,
        };
        await api.patch(`${Endpoints.REVIEW}/${reviews._id}`, { ...payload });
        const newItems = [...list];
        remove(newItems, (item) => Number(item.id) === Number(review.id));
        setLoadList(newItems);
        message.success("Review deleted successfully");
      } finally {
      }
    },
    [list, reviews]
  );

  useEffect(() => {
    if (reviews) {
      setLoadList(reviews.reviews);
    }
  }, [reviews]);

  return (
    <Spin spinning={submitting}>
      <div className="product-review-section">
        {!user ? (
          <Row justify="center">
            <Col sm={15} xs={24}>
              <h5 className="login-register-link">
                <Link href={"/login"}>Login</Link> or{" "}
                <Link href={"/login"}>Register</Link> to give review
              </h5>
            </Col>
          </Row>
        ) : (
          <>
            <Row justify="center">
              <Col sm={15} xs={24}>
                <h5 className="rating">
                  Give Your Rating
                  <Rate
                    tooltips={desc}
                    onChange={handleRateChange}
                    value={rating}
                  />
                  {rating ? (
                    <span className="ant-rate-text">{desc[rating - 1]}</span>
                  ) : (
                    ""
                  )}
                </h5>

                <Comment
                  avatar={<Avatar icon={<UserOutlined />} />}
                  content={
                    <Editor
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  }
                />
              </Col>
            </Row>
          </>
        )}
        {list && list.length > 0 && (
          <Row justify="center">
            <Col
              className={list.length > 5 ? "review" : ""}
              md={15}
              sm={24}
              xs={24}
            >
              {list.map((review) => (
                <Comment
                  key={review.id}
                  avatar={<Avatar icon={<UserOutlined />} />}
                  author={
                    <>
                      <Rate value={review.rating} /> by {review.customerName} (
                      {capitalize(moment(review.createdAt).fromNow())})
                    </>
                  }
                  content={
                    <>
                      <p>
                        {review.message}{" "}
                        {user && review.customerPhone === user?.phone && (
                          <Popconfirm
                            key={Math.random()}
                            title="Are you sure to delete this review?"
                            onConfirm={() => deleteReview(review)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button type="link">Delete</Button>
                          </Popconfirm>
                        )}
                      </p>
                      {review.ans && (
                        <Comment
                          avatar={<Avatar icon={<UserOutlined />} />}
                          author={
                            <>
                              by Admin (
                              {capitalize(moment(review.ansTime).fromNow())})
                            </>
                          }
                          content={<p>{review.ans}</p>}
                        />
                      )}
                    </>
                  }
                />
              ))}
            </Col>
          </Row>
        )}
      </div>
    </Spin>
  );
};

export default ProductReview;
