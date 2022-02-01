/** Version parameter for endpoint URL */
const VERSION_URL = "v1"; 
const API = VERSION_URL + "/api"; 

/** Private endpoint URLs */
const PRODUCTS = API + "/products";
const SLIDERS = API + "/slider"
const TESTIMONIALS = API + "/testimonial"
const MESSAGES = API + "/messages";
const ORDERS = API + "/orders";
const USER = API + "/users";
const BLOG = API + "/blog";
const SETTING = API + "/setting";
const QUESTION = API + "/question";
const REVIEW = API + "/review";
const TAG = API + "/tag";
const CATEGORY = API + "/category";

/**
 * Enum with all api endpoints
 * @readonly
 * @enum {string}
 */
export const Endpoints = Object.freeze({
  PRODUCTS: PRODUCTS,
  SLIDERS: SLIDERS,
  TESTIMONIALS: TESTIMONIALS,
  MESSAGES: MESSAGES,
  ORDERS: ORDERS,
  USER: USER,
  BLOG: BLOG,
  SETTING: SETTING,
  QUESTION: QUESTION,
  REVIEW: REVIEW,
  TAG: TAG,
  CATEGORY: CATEGORY,
});

/**
 * API response status codes enum
 * @readonly
 * @enum {number}
 */
export const ResponseStatus = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  ERROR_RESPONSE: 412,
  NOT_FOUND: 404,
});

/**
 * API can in some cases format the data:
 * * Objects: List of objects (recommended)
 * * Table: Table format with headers and rows (not recommended)
 */
export const APIDataFormat = Object.freeze({
  OBJECTS: "objects",
  TABLE: "table",
  XLSX: "xlsx",
});

/**
 * Some path segment text for API
 * * Objects: List of objects (recommended)
 */
export const APIPathSegment = Object.freeze({
  USERS: "users",
});

/**
 * Default amount of record per page from API
 *
 */
export const DEFAULT_RESULTS_PER_PAGE = 20;
export const DEFAULT_ALL_RESULTS_PER_PAGE = 50;
export const PER_PAGE_SIZE = 20;
export const INIITIAL_LOAD_SIZE = 5;

export const DEFAULT_API_PARAMS = {
  limit: DEFAULT_RESULTS_PER_PAGE,
  page: 1,
};
