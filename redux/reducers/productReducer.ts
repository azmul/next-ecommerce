import {
  FETCH_HOME_PRODUCTS,
  FETCH_SEARCH_PRODUCTS,
  FETCH_COLLECTIONS_PRODUCTS,
  FETCH_REVIEW,
  FETCH_QUESTION,
  FETCH_CAMPAIGN_PRODUCTS,
  FETCH_FLASH_PRODUCTS,
  FETCH_MENU_PRODUCTS,
} from "../actions/productActions";

const initState = {
  homeProducts: [],
  flashProducts: [],
  campaignProducts: [],
  menuProducts: [],
  products: [],
  searchProducts: [],
  review: null,
  question: null,
};

const productReducer = (state = initState, action: any) => {
  if (action.type === FETCH_HOME_PRODUCTS) {
    return {
      ...state,
      homeProducts: action.payload,
    };
  }

  if (action.type === FETCH_MENU_PRODUCTS) {
    return {
      ...state,
      menuProducts: action.payload,
    };
  }

  if (action.type === FETCH_CAMPAIGN_PRODUCTS) {
    return {
      ...state,
      campaignProducts: action.payload,
    };
  }

  if (action.type === FETCH_FLASH_PRODUCTS) {
    return {
      ...state,
      flashProducts: action.payload,
    };
  }

  if (action.type === FETCH_COLLECTIONS_PRODUCTS) {
    return {
      ...state,
      products: action.payload,
    };
  }

  if (action.type === FETCH_SEARCH_PRODUCTS) {
    return {
      ...state,
      searchProducts: action.payload,
    };
  }

  if (action.type === FETCH_REVIEW) {
    return {
      ...state,
      review: action.payload,
    };
  }

  if (action.type === FETCH_QUESTION) {
    return {
      ...state,
      question: action.payload,
    };
  }

  return state;
};

export default productReducer;
