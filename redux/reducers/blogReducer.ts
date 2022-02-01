import { FETCH_BLOGS, FETCH_RECENT_BLOGS, FETCH_BLOG } from "../actions/blogActions";

const initState = {
  blogs: [],
  recentBlogs: [],
  blog: null,
};

const blogReducer = (state = initState, action: any) => {
  if (action.type === FETCH_BLOGS) {
    return {
      ...state,
      blogs: action.payload
    };
  }

  if (action.type === FETCH_RECENT_BLOGS) {
    return {
      ...state,
      recentBlogs: action.payload
    };
  }

  if (action.type === FETCH_BLOG) {
    return {
      ...state,
      blog: action.payload
    };
  }

  return state;
};

export default blogReducer;
