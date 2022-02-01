import { FETCH_CATEGORIES, FETCH_TAGS, SEARCH_STRING } from "../actions/commonActions";

const initState = {
  tags: [],
  categories: [],
  search: null,
};

const commonReducer = (state = initState, action: any) => {
  if (action.type === FETCH_CATEGORIES) {
    return {
      ...state,
      categories: action.payload
    };
  }

  if (action.type === FETCH_TAGS) {
    return {
      ...state,
      tags: action.payload
    };
  }

  if (action.type === SEARCH_STRING) {
    return {
      ...state,
      search: action.payload
    };
  }

  return state;
};

export default commonReducer;
