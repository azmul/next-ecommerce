import { FETCH_USER, USER_TOKEN } from "../actions/userActions";

const initState = {
  user: null,
  token: false
};

const userReducer = (state = initState, action: any) => {
  if (action.type === FETCH_USER) {
    return {
      ...state,
      user: action.payload
    };
  }

  if (action.type === USER_TOKEN) {
    return {
      ...state,
      token: action.payload
    };
  }

  return state;
};

export default userReducer;