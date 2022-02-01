import React, { Fragment } from "react";
import moment from "moment";
import { Descriptions, Comment, Avatar } from "antd";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import { UserOutlined } from "@ant-design/icons";
import  Link  from "next/link";

const Post = ({ blog }) => {
  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img alt={blog && blog.title} src={blog && blog.picture_url} />
        </div>
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
              <li>by {blog && blog.creator_name} </li>
              <li>{moment(blog && blog.createdAt).format("DD.MM.YYYY")}</li>
              <li>
                {blog && blog.like_count} <i className="fa fa-comments-o" />
              </li>
            </ul>
          </div>
          <h3>{blog && blog.title}</h3>
          <p>{blog && blog.content}</p>
          <br />
          {blog && blog.product_url && (
            <Link
              className="for-order-section"
              href={`${blog && blog.product_url}`}
            >
              For Order Click Here
            </Link>
          )}
          <br />
          <br />
          {blog &&
            blog.content_items &&
            blog.content_items.length > 0 &&
            blog.content_items.map((item) => (
              <Descriptions key={Math.random()} title={item.title}>
                <Descriptions.Item>{item.description}</Descriptions.Item>
              </Descriptions>
            ))}
          {blog && blog.admin_message && (
            <Comment
              author={<>By Admin </>}
              avatar={<Avatar icon={<UserOutlined />} />}
              content={
                <p>
                  {blog.admin_message}.{" "}
                  {blog && blog.product_url && (
                    <Link
                      className="for-order-section"
                      href={
                        `${blog && blog.product_url}`
                      }
                    >
                      Click for Order
                    </Link>
                  )}
                </p>
              }
            />
          )}
        </div>
      </div>
      <div className="tag-share">
        <div className="dec-tag">
          <ul>
            <li>{blog && blog.category}</li>
          </ul>
        </div>
        <div className="blog-share">
          <span>share :</span>
          <div className="share-social">
            <ul>
              <li>
                <FacebookShareButton
                  className="facebook"
                  url={`${process.env.PUBLIC_URL}/blog/${blog && blog._id}`}
                  quote={blog && blog.title}
                >
                  <i className="fa fa-facebook" />
                </FacebookShareButton>
              </li>
              <li>
                <TwitterShareButton
                  className="twitter"
                  url={`${process.env.PUBLIC_URL}/blog/${blog && blog._id}`}
                  quote={blog && blog.title}
                >
                  <i className="fa fa-twitter" />
                </TwitterShareButton>
              </li>
              <li>
                <PinterestShareButton
                  className="instagram"
                  url={`${process.env.PUBLIC_URL}/blog/${blog && blog._id}`}
                  quote={blog && blog.title}
                >
                  <i className="fa fa-instagram" />
                </PinterestShareButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Post;
