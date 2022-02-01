import { FETCH_SLIDER } from "../actions/sliderActions";

const initState = {
  sliders: []
};

const sliderReducer = (state = initState, action: any) => {
  if (action.type === FETCH_SLIDER) {
    return {
      ...state,
      sliders: action.payload
    };
  }

  return state;
};

export default sliderReducer;
