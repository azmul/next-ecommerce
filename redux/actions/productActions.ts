import { Endpoints } from "../../api/apiConst";
import { api } from "../../api/apiHelper";

export const FETCH_HOME_PRODUCTS = "FETCH_HOME_PRODUCTS";
export const FETCH_SEARCH_PRODUCTS = "FETCH_SEARCH_PRODUCTS";
export const FETCH_CAMPAIGN_PRODUCTS = "FETCH_CAMPAIGN_PRODUCTS";
export const FETCH_MENU_PRODUCTS = "FETCH_MENU_PRODUCTS";
export const FETCH_FLASH_PRODUCTS = "FETCH_FLASH_PRODUCTS";
export const FETCH_COLLECTIONS_PRODUCTS = "FETCH_COLLECTIONS_PRODUCTS";
export const FETCH_REVIEW = "FETCH_REVIEW";
export const FETCH_QUESTION = "FETCH_QUESTION";

// fetch products
export const fetchProducts = () => {
  return async (dispatch: any) => {
    try {
      const response = await api.get(`${Endpoints.PRODUCTS}/home`);
      dispatch({
        type: FETCH_HOME_PRODUCTS,
        payload: response.data.data,
      });
    } finally {
    }
  };
};

// fetch menu products
export const fetchMenuProducts = (params: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: FETCH_MENU_PRODUCTS,
        payload: [],
      });
      const response = await api.get(`${Endpoints.PRODUCTS}`, {params: {...params}});
      dispatch({
        type: FETCH_MENU_PRODUCTS,
        payload: response.data.data,
      });
    } finally {
    }
  };
};

// fetch flash products
export const fetchFlashProducts = () => {
  return async (dispatch: any) => {
    try {
      const response = await api.get(`${Endpoints.PRODUCTS}/flash`);
      dispatch({
        type: FETCH_FLASH_PRODUCTS,
        payload: response.data.data,
      });
    } finally {
    }
  };
};

// fetch campaign products
export const fetchCampaignProducts = () => {
  return async (dispatch: any) => {
    try {
      const response = await api.get(`${Endpoints.PRODUCTS}/campaign`);
      dispatch({
        type: FETCH_CAMPAIGN_PRODUCTS,
        payload: response.data.data,
      });
    } finally {
    }
  };
};

// fetch search products
export const fetchSearchProducts = (name: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: FETCH_SEARCH_PRODUCTS,
        payload: [],
      });
      const response = await api.get(`${Endpoints.PRODUCTS}`, {
        params: { name },
      });
      dispatch({
        type: FETCH_SEARCH_PRODUCTS,
        payload: response.data.data,
      });
    } finally {
    }
  };
};

// fetch all collections products
export const fetchCollectionsProducts = () => {
  return async (dispatch: any) => {
    try {
      const response = await api.get(`${Endpoints.PRODUCTS}/collection`);
      dispatch({
        type: FETCH_COLLECTIONS_PRODUCTS,
        payload: response.data.data,
      });
    } finally {
    }
  };
};

// fetch reviews
export const fetchReview = (id: string | number) => {
  return async (dispatch: any) => {
    try {
      const response = await api.get(`${Endpoints.REVIEW}/product/${id}`);
      dispatch({
        type: FETCH_REVIEW,
        payload: response.data,
      });
    } finally {
    }
  };
};

// fetch reviews
export const fetchQuestion = (id: string | number) => {
  return async (dispatch: any) => {
    try {
      const response = await api.get(`${Endpoints.QUESTION}/product/${id}`);
      dispatch({
        type: FETCH_QUESTION,
        payload: response.data,
      });
    } finally {
    }
  };
};
