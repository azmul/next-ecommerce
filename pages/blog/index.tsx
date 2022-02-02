import type { NextPage } from "next";
import React, { Fragment, useEffect } from "react";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogPosts from "../../wrappers/blog/Posts";
import { getBlogs } from "../../redux/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { RootState } from "../../redux/store";
import BlogLoader from "../../components/loader/BlogLoader";
import { NextSeo } from "next-seo";

const BlogPage: NextPage = () => {
  const SEO = {
    title: "Blog | Kureghorbd",
    openGraph: {
      title: "Blog | Kureghorbd",
    }
  }
  const dispatch = useDispatch();

  const blogs = useSelector((state: RootState) => state.blogData.blogs);

  const paginationHandle = (current: number, pageSize: number) => {
    dispatch(getBlogs({ current, pageSize }));
  };

  useEffect(() => {
    dispatch(getBlogs({ current: 1, pageSize: 6 }));
  }, [dispatch]);

  return (
    <Fragment>
      <NextSeo {...SEO} />
      <div className="blog-area pt-50 pb-100">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9">
              {blogs && blogs.data && blogs.data.length > 0 ? (
                <div className="ml-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPosts blogs={blogs && blogs.data} />
                  </div>

                  {/* blog pagination */}
                  <div className="text-center">
                    <Pagination
                      onChange={paginationHandle}
                      pageSize={6}
                      defaultCurrent={1}
                      total={
                        blogs && blogs?.pagination && blogs.pagination.total
                      }
                    />
                  </div>
                </div>
              ) : (
                <BlogLoader />
              )}
            </div>
            <div className="col-lg-3">
              {/* blog sidebar */}
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPage;
