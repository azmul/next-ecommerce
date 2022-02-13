import React, { useState, useCallback, useEffect } from "react";
import {
  Comment,
  Avatar,
  Form,
  Button,
  Input,
  Row,
  Col,
  message,
  Spin,
  Popconfirm,
} from "antd";
import { useSelector } from "react-redux";
import Link  from "next/link";
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
      >
        Add Question
      </Button>
    </Form.Item>
  </>
);

const ProductQuestion = ({ questions }) => {
  const user = useSelector((state: RootState) => state.userData.user);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
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
      ques: value,
      customerPhone: user.phone,
      customerName: user.name,
    };
    const newItems = [...list];
    newItems.unshift(payload);
    setLoadList(newItems);
    try {
      setSubmitting(true);
      await api.patch(`${Endpoints.QUESTION}/${questions._id}`, {
        ...payload,
      });
      setValue("");
      message.success("question Added successfully");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteQuestion = useCallback(
    async (question) => {
      if (!questions) return;
      try {
        const payload = {
          id: question.id,
          isDeleted: true,
        };
        await api.patch(`${Endpoints.QUESTION}/${questions._id}`, {
          ...payload,
        });
        const newItems = [...list];
        remove(newItems, (item) => Number(item.id) === Number(question.id));
        setLoadList(newItems);
        message.success("question deleted successfully");
      } finally {
      }
    },
    [list, questions]
  );

  useEffect(() => {
    if (questions) {
      setLoadList(questions.questions);
    }
  }, [questions]);

  return (
    <Spin spinning={submitting}>
      <div className="product-question-section">
        {!user ? (
          <Row justify="center">
            <Col sm={15} xs={24}>
              <h5 className="login-register-link">
                <Link href={"/login"}>Login</Link> or{" "}
                <Link href={"/login"}>Register</Link> to ask question
              </h5>
            </Col>
          </Row>
        ) : (
          <>
            <Row justify="center">
              <Col sm={15} xs={24}>
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
              className={list.length > 5 ? "question" : ""}
              md={15}
              sm={24}
              xs={24}
            >
              {list.map((question) => (
                <Comment
                  key={question.id}
                  avatar={<Avatar icon={<UserOutlined />} />}
                  author={
                    <>
                      by {question.customerName}(
                      {capitalize(moment(question.createdAt).fromNow())})
                    </>
                  }
                  content={
                    <>
                      <p>
                        {question.ques}{" "}
                        {user && question.customerPhone === user?.phone && (
                          <Popconfirm
                            key={Math.random()}
                            title="Are you sure to delete this question?"
                            onConfirm={() => deleteQuestion(question)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button type="link">Delete</Button>
                          </Popconfirm>
                        )}
                      </p>
                      {question.ans && (
                        <Comment
                          avatar={<Avatar icon={<UserOutlined />} />}
                          author={
                            <>
                              by Admin (
                              {capitalize(moment(question.ansTime).fromNow())})
                            </>
                          }
                          content={<p>{question.ans}</p>}
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

export default ProductQuestion;
