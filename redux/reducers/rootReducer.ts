import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import sliderReducer from "./sliderReducer";
import testimonialReducer from "./testimonialReducer";
import userReducer from "./userReducer";
import blogReducer from "./blogReducer";
import settingReducer from "./settingReducer";
import commonReducer from "./commonReducer";

import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  sliderData: sliderReducer,
  testimonialData: testimonialReducer,
  userData: userReducer,
  blogData: blogReducer,
  settingData: settingReducer,
  commonData: commonReducer,
});

export default rootReducer;
