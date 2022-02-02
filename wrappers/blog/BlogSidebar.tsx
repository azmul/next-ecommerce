import React, {useEffect} from "react";
import  Link  from "next/link";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getRecentBlogs } from "../../redux/actions/blogActions";
import {RootState} from "../../redux/store";
import Image from "next/image";

const BlogSidebar = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state: RootState) => state.blogData.recentBlogs);

  useEffect(() => {
    dispatch(getRecentBlogs());
  }, [dispatch]);

  return (
    <div className="sidebar-style">
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Recent Blogs </h4>
        <div className="sidebar-project-wrap mt-30">
        {blogs && blogs.length > 0 && blogs.map(blog=>(
          <div className="single-sidebar-blog" key={blog._id}>
            <div className="sidebar-blog-img">
              <Link passHref href={`/blog/${blog._id}`}>
                  <Image
                  src={
                    blog.picture_url
                  }
                  alt={blog.title}
                  width={100}
                  height={70}
                  priority
                  layout="responsive"
                />
                
              </Link>
            </div>
            <div className="sidebar-blog-content">
              <span>{blog.category}</span>
              <h4>
                <Link passHref href={`/blog/${blog._id}`}>
                  <Typography.Paragraph ellipsis={{ rows: 1 }} >
                    {blog.title}
                  </Typography.Paragraph>
                </Link>
              </h4>
            </div>
          </div>
        ))}
          
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
