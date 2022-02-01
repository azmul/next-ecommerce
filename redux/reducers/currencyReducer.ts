import { CHANGE_CURRENCY } from "../actions/currencyActions";

const initState = {
  currencySymbol: "৳",
  currencyName: "BDT",
  currencyRate: 1
};

const currencyReducer = (state = initState, action: any) => {
  if (action.type === CHANGE_CURRENCY) {
    const currencyName = action.payload.currencyName;

    if (currencyName === "USD") {
      return {
        ...state,
        currencySymbol: "$",
        currencyRate: action.payload.currencyRate,
        currencyName
      };
    }
    if (currencyName === "BDT") {
      return {
        ...state,
        currencySymbol: "৳",
        currencyRate: action.payload.currencyRate,
        currencyName
      };
    }
  }

  return state;
};

export default currencyReducer;
