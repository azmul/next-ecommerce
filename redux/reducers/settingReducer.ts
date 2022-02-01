import { SETTING } from "../actions/settingActions";

const initState = {
  setting: null
};

const settingReducer = (state = initState, action: any) => {
  if (action.type === SETTING) {
    return {
      ...state,
      setting: action.payload
    };
  }

  return state;
};

export default settingReducer;
