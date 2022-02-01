import {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  DELETE_ALL_FROM_WISHLIST
} from "../actions/wishlistActions";

const initState: any= [];

const wishlistReducer = (state = initState, action: any) => {
  const wishlistItems = state,
    product = action.payload;

  if (action.type === ADD_TO_WISHLIST) {
    const wishlistItem = wishlistItems.filter(
      (item: any) => item.id === product._id
    )[0];
    if (wishlistItem === undefined) {
      return [...wishlistItems, product];
    } else {
      return wishlistItems;
    }
  }

  if (action.type === DELETE_FROM_WISHLIST) {
    const remainingItems = (wishlistItems: any, product: any) =>
      wishlistItems.filter((wishlistItem: any) => wishlistItem.id !== product._id);
    return remainingItems(wishlistItems, product);
  }

  if (action.type === DELETE_ALL_FROM_WISHLIST) {
    return wishlistItems.filter((item: any) => {
      return false;
    });
  }

  return wishlistItems;
};

export default wishlistReducer;
