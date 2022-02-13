import {Endpoints} from "api/apiConst";
import { api } from "api/apiHelper";

export const FETCH_TESTIMONIAL = "FETCH_TESTIMONIAL";

export const getTestimonials = () => {
  return async (dispatch: any)  => {
    try {
        const response = await api.get(Endpoints.TESTIMONIALS);
        dispatch({
          type: FETCH_TESTIMONIAL,
          payload: response.data.data
        });
      } finally {}
       
  };
};