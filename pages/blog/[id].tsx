import React, { Fragment } from "react";
import BlogSidebar from "wrappers/blog/BlogSidebar";
import Comment from "wrappers/blog/Comment";
import Post from "wrappers/blog/Post";
import { Divider } from "antd";
import { api } from "api/apiHelper";
import {Endpoints} from "api/apiConst";
import { NextSeo } from "next-seo";

const Blog = ({blog, recentBlogs}) => {
  const SEO = {
    title: `Kureghor Ecommerce | ${blog.title}`,
    description: `Kureghor Ecommerce | ${blog.content}`,
    openGraph: {
      title: `Kureghor Ecommerce | ${blog.title}`,
      description: `Kureghor Ecommerce | ${blog.content}`,
    }
  }
  return (
    <Fragment>
        <NextSeo {...SEO} />
        <div className="blog-area pt-50 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-9">
                <div className="blog-details-wrapper ml-20">
                  {/* blog post */}
                  <Post blog={blog} />
                   <Divider />
                  {/* blog post comment */}
                  <Comment id={blog && blog._id} commentLists={blog && blog.comments && blog.comments.length > 0 ? blog.comments : []} />
                </div>
              </div>
              <div className="col-lg-3">
                {/* blog sidebar */}
                <BlogSidebar blogs={recentBlogs} />
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

export async function getStaticPaths() {
    try {
        const response = await api.get(`${Endpoints.BLOG}/all`);
        const blogs = response.data.data;
        const paths = blogs.map((blog) => {
            return {
                params: {
                    id: blog._id,
                }, 
              }
        })
        return {paths, fallback: true}
    } finally {}
  }

  export async function getStaticProps({params}) {
    try {
        const response = await api.get(`${Endpoints.BLOG}/${params.id}`);
        const recentBlogs = await api.get(`${Endpoints.BLOG}/recent`);
        
        return {
            props: {
                blog: response.data,
                recentBlogs: recentBlogs.data.data,
            }, 
            revalidate: 10,
          }
    } finally {}
  }


export default Blog;
