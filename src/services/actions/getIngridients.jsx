import { getIngredients, getorder } from "../../utils/api";
export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const SET_BUN = "SET_BUN";
export const SET_ALL_TO_CONSTRUCTOR = "SET_ALL_TO_CONSTRUCTOR";
export const RESET_BUNS = "RESET_BUNS";
export const SET_TO_MODAL = "SET_TO_MODAL";

export function getItems() {
  return function (dispatch) {
    getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_REQUEST,
            items: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export const setBun = (item) => {
  return function (dispatch) {
    dispatch({
      type: SET_BUN,
      bun: item,
    });
  };
};
export const selectAll = (id, ingredients) => {
  return function (dispatch) {
    dispatch({ type: SET_ALL_TO_CONSTRUCTOR, Id: id, payload: ingredients });
  };
};

export const resetBuns = () => {
  return function (dispatch) {
    dispatch({
      type: RESET_BUNS,
    });
  };
};
export const setModalEmpty = () => {
  return function (dispatch) {
    dispatch({
      type: SET_TO_MODAL,
      ingModal: [],
    });
  };
};
export function getOrder(number) {
  return function (dispatch) {
    getorder(number)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_TO_MODAL,
            ingModal: res.orders,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
