import { postOrder } from "../../utils/api";

export const SET_PRICE = "SET_PRICE";
export const SET_ORDER_NUMBER = "SET_ORDER_NUMBER";
export const ADD_TO_CONSTRUCTOR = "ADD_TO_CONSTRUCTOR";
export const DELETE_FROM_CONSTRUCTOR = "DELETE_FROM_CONSTRUCTOR";
export const CONSTRUCTOR_REPLACE = "CONSTRUCTOR_REPLACE";
export const RESET_INGREDIENTS = "RESET_INGREDIENTS";
export const selectIngredient = (id, ingredients) => {
  return function (dispatch) {
    dispatch({
      type: ADD_TO_CONSTRUCTOR,
      Id: id,
      payload: ingredients,
    });
  };
};
export const moveIngredientInConstructor = (payload) => {
  return function (dispatch) {
    dispatch({
      type: CONSTRUCTOR_REPLACE,
      payload,
    });
  };
};

export const deleteFromConstructor = (item) => {
  return function (dispatch) {
    dispatch({
      type: DELETE_FROM_CONSTRUCTOR,
      payload: item.Id,
    });
  };
};
export const resetIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: RESET_INGREDIENTS,
    });
  };
};
export const setOrderNumber = (array) => {
  return function (dispatch) {
    postOrder(array)
      .then((res) => {
        let order = res.order.number;
        if (res && res.success) {
          dispatch({
            type: SET_ORDER_NUMBER,
            ordernumber: order,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
