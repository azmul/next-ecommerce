export const ADD_TO_COMPARE = "ADD_TO_COMPARE";
export const DELETE_FROM_COMPARE = "DELETE_FROM_COMPARE";

// add to compare
export const addToCompare = (item: any, addToast: any) => {
  return (dispatch: any) => {
    if (addToast) {
      addToast("Added To Compare", {
        appearance: "success",
        autoDismiss: true
      });
    }
    dispatch({ type: ADD_TO_COMPARE, payload: item });
  };
};

// remove from compare
export const removeFromCompare = (item: any, addToast: any) => {
  return (dispatch: any) => {
    if (addToast) {
      addToast("Removed From Compare", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_FROM_COMPARE, payload: item });
  };
};
