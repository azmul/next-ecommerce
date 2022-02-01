import { ADD_TO_COMPARE, DELETE_FROM_COMPARE } from "../actions/compareActions";

const initState: any= [];

const compareReducer = (state = initState, action: any) => {
  const compareItems = state,
    product = action.payload;

  if (action.type === ADD_TO_COMPARE) {
    const compareItem = compareItems.filter((item: any) => item.id === product.id)[0];
    if (compareItem === undefined) {
      return [...compareItems, product];
    } else {
      return compareItems;
    }
  }

  if (action.type === DELETE_FROM_COMPARE) {
    const remainingItems = (compareItems: any, product: any) =>
      compareItems.filter((compareItem: any) => compareItem.id !== product.id);
    return remainingItems(compareItems, product);
  }

  return compareItems;
};

export default compareReducer;
