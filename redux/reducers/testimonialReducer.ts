import { FETCH_TESTIMONIAL } from "../actions/testimonialActions";

const initState = {
  testimonials: []
};

const testimonialReducer = (state = initState, action: any) => {
  if (action.type === FETCH_TESTIMONIAL) {
    return {
      ...state,
      testimonials: action.payload
    };
  }

  return state;
};

export default testimonialReducer;
