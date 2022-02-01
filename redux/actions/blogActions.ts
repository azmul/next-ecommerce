import {Endpoints} from "../../api/apiConst";
import { api } from "../../api/apiHelper";

export const FETCH_BLOGS = "FETCH_BLOGS";
export const FETCH_BLOG = "FETCH_BLOG";
export const FETCH_RECENT_BLOGS = "FETCH_RECENT_BLOGS";

export const getBlogs = (params: any) => {
  return async (dispatch: any)  => {
    try {
        const response = await api.get(Endpoints.BLOG, {params: {...params}});
        dispatch({
          type: FETCH_BLOGS,
          payload: response.data
        });
      } finally {} 
  };
};

export const getBlog = (id: string | number) => {
  return async (dispatch: any) => {
    try {
        const response = await api.get(`${Endpoints.BLOG}/${id}`);
        dispatch({
          type: FETCH_BLOG,
          payload: response.data
        });
      } finally {}
       
  };
};

export const getRecentBlogs = () => {
  return async (dispatch: any)  => {
    try {
        const response = await api.get(`${Endpoints.BLOG}/recent`);
        dispatch({
          type: FETCH_RECENT_BLOGS,
          payload: response.data.data
        });
      } finally {}
       
  };
};