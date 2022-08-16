import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const productListReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loding: true, product: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loding: false, product: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loding: false, error: action.payload };
    default:
      return state;
  }
};
