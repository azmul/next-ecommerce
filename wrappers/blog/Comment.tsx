import React, { Fragment, useState, useEffect , useCallback} from "react";
import {
  List,
  Button,
  Comment,
  Spin,
  Form,
  Input,
  Avatar,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import { useSelector } from "react-redux";
import Link  from "next/link";
import { Endpoints } from "api/apiConst";
import { api } from "api/apiHelper";
import { numericCode } from "numeric-code";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import { remove } from "lodash";
import {RootState} from "redux/store";

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
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const BlogComment = ({ commentLists, id }) => {
  const [loadingComment] = useState(false);
  const user = useSelector((state: RootState) => state.userData.user);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [loadCommentList, setLoadCommentList] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!value) {
      return;
    }
    const payload = {
      id: numericCode(6),
      comment: value,
      customerPhone: user.phone,
      customerName: user.name,
    };
    const newComments = [...loadCommentList];
    newComments.unshift(payload);
    setLoadCommentList(newComments);
    try {
      setSubmitting(true);
      await api.post(`${Endpoints.BLOG}/comments/${id}`, { ...payload });
      setValue("");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteComment = useCallback(
    async (comment) => {
      try {
        const payload = {
          id: comment.id,
          isDeleted: true,
        };
        await api.post(`${Endpoints.BLOG}/comments/${id}`, { ...payload });
        const newComments = [...loadCommentList];
        remove(
          newComments,
          (item) => Number(item.id) === Number(comment.id)
        );
        setLoadCommentList(newComments);
        message.success("Comment deleted successfully");
      } finally {
      }
    },
    [id, loadCommentList]
  );

  useEffect(() => {
    const data = loadCommentList.map((comment) => ({
      actions: [
        <>
          {user && comment.customerPhone === user?.phone && (
            <Popconfirm
              key={Math.random()}
              title="Are you sure to delete this comment?"
              onConfirm={() => deleteComment(comment)}
              okText="Yes"
              cancelText="No"
            >
              <a href="javascript">Delete</a>
            </Popconfirm>
          )}
        </>,
      ],
      author: `${comment.customerName} (${comment.customerPhone})`,
      avatar: (
        <>
          {" "}
          <Avatar icon={<UserOutlined />} />
        </>
      ),
      content: <p>{comment.comment}</p>,
      datetime: (
        <Tooltip
          title={moment(comment.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        >
          <span>{moment(comment.createdAt).fromNow()}</span>
        </Tooltip>
      ),
    }));
    setComments(data);
  }, [deleteComment, loadCommentList, loadCommentList.length, user]);

  useEffect(() => {
    setLoadCommentList(commentLists);
  },[commentLists])

  return (
    <Fragment>
      <div className="blog-comment-wrapper mt-40">
        <Spin spinning={loadingComment}>
          {!user ? (
            <h5 className="login-register-link">
              <Link href={"/login-register"}>Login</Link> or{" "}
              <Link href={"/login-register"}>Register</Link> to leave a comment
            </h5>
          ) : (
            <Comment
              avatar={
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt="Han Solo"
                />
              }
              content={
                <Editor
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          )}

          {comments && comments.length > 0 ? (
            <List
              className="comment-list"
              header={`Comments about this post (${comments.length})`}
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <li>
                  <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                  />
                </li>
              )}
            />
          ) : (
            <p>There is no comment for this post</p>
          )}
        </Spin>
      </div>
    </Fragment>
  );
};

export default BlogComment;
