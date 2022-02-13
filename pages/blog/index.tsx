import type { NextPage } from "next";
import React, { Fragment, useMemo, useState } from "react";
import BlogSidebar from "wrappers/blog/BlogSidebar";
import BlogPosts from "wrappers/blog/Posts";
import { Pagination } from "antd";
import BlogLoader from "components/loader/BlogLoader";
import { NextSeo } from "next-seo";
import useSWR from "swr";
import { Endpoints } from "api/apiConst";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useDispatch } from "react-redux";
import { FETCH_BLOGS } from "redux/actions/blogActions";

const BlogPage: NextPage = () => {
  const SEO = {
    title: "Blog | Kureghorbd",
    openGraph: {
      title: "Blog | Kureghorbd",
    },
  };
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const reduxStoreBlogs = useSelector(
    (state: RootState) => state.blogData.blogs
  );

  const { data } = useSWR(
    `${Endpoints.BLOG}?current=${current}&pageSize=${pageSize}`
  );
  
  const blogs: any[] = useMemo(
    () => (data ? data.data : reduxStoreBlogs),
    [data, reduxStoreBlogs]
  );
  const pagination = useMemo(() => (data ? data.pagination : null), [data]);

  dispatch({
    type: FETCH_BLOGS,
    payload: blogs,
  });

  const paginationHandle = (current: number, pageSize: number) => {
    setCurrent(current);
    setPageSize(pageSize);
  };

  return (
    <Fragment>
      <NextSeo {...SEO} />
      <div className="blog-area pt-50 pb-100">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9">
              {blogs && blogs.length > 0 ? (
                <div className="ml-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPosts blogs={blogs} />
                  </div>

                  {/* blog pagination */}
                  <div className="text-center">
                    <Pagination
                      onChange={paginationHandle}
                      pageSize={6}
                      defaultCurrent={1}
                      total={blogs && pagination && pagination.total}
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
