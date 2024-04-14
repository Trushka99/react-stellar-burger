import { postOrder } from "../../utils/api";
import { TIngredientData } from "../../utils/types";
import { AppThunk, AppDispatch } from "../../utils";
export const SET_PRICE: "SET_PRICE" = "SET_PRICE";
export const SET_ORDER_NUMBER: "SET_ORDER_NUMBER" = "SET_ORDER_NUMBER";
export const ADD_TO_CONSTRUCTOR: "ADD_TO_CONSTRUCTOR" = "ADD_TO_CONSTRUCTOR";
export const DELETE_FROM_CONSTRUCTOR: "DELETE_FROM_CONSTRUCTOR" =
  "DELETE_FROM_CONSTRUCTOR";
export const CONSTRUCTOR_REPLACE: "CONSTRUCTOR_REPLACE" = "CONSTRUCTOR_REPLACE";
export const RESET_INGREDIENTS: "RESET_INGREDIENTS" = "RESET_INGREDIENTS";

type IngredientOrder = {
  dragIndex: number;
  hoverIndex: number;
};
export interface ISetPrice {
  readonly type: typeof SET_PRICE;
  payload: number;
}
export interface IIngredientMove {
  readonly type: typeof CONSTRUCTOR_REPLACE;
  payload: IngredientOrder;
}
export interface IAddToConstructor {
  readonly type: typeof ADD_TO_CONSTRUCTOR;
  payload: TIngredientData;
}
export interface IDeleteIngredient {
  readonly type: typeof DELETE_FROM_CONSTRUCTOR;
  payload: string;
}

export interface IResetAllIngredient {
  readonly type: typeof RESET_INGREDIENTS;
}
export interface ISetOrderNumber {
  readonly type: typeof SET_ORDER_NUMBER;
  readonly payload: number;
}

export type TConstructorActions =
  | IIngredientMove
  | IAddToConstructor
  | IDeleteIngredient
  | IResetAllIngredient
  | ISetOrderNumber
  | ISetPrice;

export const selectIngredient = (payload: TIngredientData): IAddToConstructor => ({
  type: ADD_TO_CONSTRUCTOR,
  payload,
});

export const setPrice = (payload: number): ISetPrice => ({
  type: SET_PRICE,
  payload: payload,
});

export const moveIngredientInConstructor = (
  payload: IngredientOrder
): IIngredientMove => ({
  type: CONSTRUCTOR_REPLACE,
  payload,
});

export const getOrderNumber = (payload: number): ISetOrderNumber => ({
  type: SET_ORDER_NUMBER,
  payload,
});

export const deleteFromConstructor = (payload: string): IDeleteIngredient => ({
  type: DELETE_FROM_CONSTRUCTOR,
  payload,
});

export const resetIngredients = (): IResetAllIngredient => ({
  type: RESET_INGREDIENTS,
});

export const setOrderNumber: AppThunk = (array: Array<string>) => {
  return function (dispatch: AppDispatch) {
    postOrder(array)
      .then((res) => {
        if (res && res.success) {
          dispatch(getOrderNumber(res.order.number));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
