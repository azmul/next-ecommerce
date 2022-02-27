import type { NextPage } from "next";
import React, { useMemo, useState, useEffect } from "react";
import BlogSidebar from "wrappers/blog/BlogSidebar";
import BlogPosts from "wrappers/blog/Posts";
import BlogLoader from "components/loader/BlogLoader";
import { NextSeo } from "next-seo";
import { Endpoints } from "api/apiConst";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useDispatch } from "react-redux";
import { FETCH_BLOGS } from "redux/actions/blogActions";
import { api } from "api/apiHelper";
import Paginator from "react-hooks-paginator";

const pageLimit = 8;

const BlogPage: NextPage = ({ data, total, recentBlogs }: any) => {
  const SEO = {
    title: "Blog | Kureghorbd",
    openGraph: {
      title: "Blog | Kureghorbd",
    },
  };
  const dispatch = useDispatch();
  const [paginatedBlogs, setPaginatedBlogs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const reduxStoreBlogs = useSelector(
    (state: RootState) => state.blogData.blogs
  );

  const blogs: any[] = useMemo(
    () => (data ? data : reduxStoreBlogs),
    [data, reduxStoreBlogs]
  );

  dispatch({
    type: FETCH_BLOGS,
    payload: blogs,
  });

  useEffect(() => {
    if(blogs && blogs.length > 0) {
      setPaginatedBlogs(blogs.slice(offset, offset + pageLimit));
    }
  }, [blogs, offset]);

  return (
    <div id="page">
      <NextSeo {...SEO} />
      <div className="blog-area pt-50 pb-100">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9">
              {blogs && blogs.length > 0 ? (
                <div className="ml-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPosts blogs={paginatedBlogs} />
                  </div>

                  {/* blog pagination */}
                  <div className="pro-pagination-style text-center mt-30">
                    <Paginator
                      totalRecords={total}
                      pageLimit={pageLimit}
                      pageNeighbours={2}
                      setOffset={setOffset}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pageContainerClass="mb-0 mt-0"
                      pagePrevText="«"
                      pageNextText="»"
                    />
                  </div>
                </div>
              ) : (
                <BlogLoader />
              )}
            </div>
            <div className="col-lg-3">
              {/* blog sidebar */}
              <BlogSidebar blogs={recentBlogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const response = await api.get(`${Endpoints.BLOG}/all`);
    const blogs = response.data.data;
    const total = response.data.total;
    const recentBlogs = await api.get(`${Endpoints.BLOG}/recent`);

    return {
      props: {
        data: blogs,
        recentBlogs: recentBlogs.data.data,
        total,
      },
      revalidate: 10,
    };
  } finally {
  }
}

export default BlogPage;
