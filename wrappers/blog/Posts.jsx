import  Link  from "next/link";
import moment from "moment";
import {Typography} from "antd";
import Image from "next/image";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";

const { Paragraph } = Typography;

const BlogPosts = ({blogs}) => {
  
  return (
    <>
    {blogs && blogs.length > 0 ? blogs.map((blog) => (
      <div key={blog._id} className="col-lg-6 col-md-6 col-sm-12">
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link passHref href={`/blog/${blog._id}`}>
              <Image
                src={blog.picture_url}
                alt={blog.title}
                loading="eager"
                  layout="responsive"
                width={200}
                height={150}
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>by {blog && blog.creator_name} </li>
                <li>{moment(blog.createdAt).format('DD.MM.YYYY')}</li>
                <li>
                    {blog.like_count} <i className="fa fa-comments-o" />
                </li>
              </ul>
            </div>
            <h4>
              <Link href={`/blog/${blog._id}`}>
                {blog.title}
              </Link>
            </h4>
            <Paragraph ellipsis={{ rows: 4 }} >
              {blog.content}
            </Paragraph>
            {blog && blog.product_url && <Link passHref href={blog && blog.product_url}><span className="for-order-section">For Order Click Here</span></Link>}
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link href={`/blog/${blog._id}`} >
                  read more
                </Link>
              </div>
              <div className="blog-share">
                <span>share :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <FacebookShareButton className="facebook" url={`${window.location.href}/blog/${blog && blog._id}`} quote={blog.title}>
                        <i className="fa fa-facebook" />
                      </FacebookShareButton>
                    </li>
                    <li>
                    <TwitterShareButton className="twitter" url={`${window.location.href}/blog/${blog && blog._id}`} quote={blog.title}>
                        <i className="fa fa-twitter" />
                      </TwitterShareButton>
                    </li>
                    <li>
                    <PinterestShareButton className="instagram" url={`${window.location.href}/blog/${blog && blog._id}`} quote={blog.title}>
                        <i className="fa fa-instagram" />
                      </PinterestShareButton>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )): "There is No Blogs Right Now"}
      
    </>
  );
};

export default BlogPosts;
