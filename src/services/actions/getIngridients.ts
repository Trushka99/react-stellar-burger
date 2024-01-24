import { getIngredients, getorder } from "../../utils/api";
import { TIngredientData } from "../../utils/types";
import { AppThunk, AppDispatch } from "../../utils";
export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const SET_BUN: "SET_BUN" = "SET_BUN";
export const SET_ALL_TO_CONSTRUCTOR: "SET_ALL_TO_CONSTRUCTOR" =
  "SET_ALL_TO_CONSTRUCTOR";
export const RESET_BUNS: "RESET_BUNS" = "RESET_BUNS";
export const SET_TO_MODAL: "SET_TO_MODAL" = "SET_TO_MODAL";

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_ITEMS_REQUEST;
  payload: Array<TIngredientData>;
}
export interface IAddBuns {
  readonly type: typeof SET_BUN;
  payload: Array<TIngredientData>;
}

export interface ISetToConstructor {
  readonly type: typeof SET_ALL_TO_CONSTRUCTOR;
  all: TIngredientData;
}

export interface IResetBuns {
  readonly type: typeof RESET_BUNS;
}

export interface ISetModal {
  readonly type: typeof SET_TO_MODAL;
  payload: any;
}

export const getIngredient = (
  payload: Array<TIngredientData>
): IGetIngredientsSuccess => ({
  type: GET_ITEMS_REQUEST,
  payload,
});
export const getModalEmpty = (payload: []): ISetModal => ({
  type: SET_TO_MODAL,
  payload,
});
export const getModal = (payload: any): ISetModal => ({
  type: SET_TO_MODAL,
  payload,
});

export type TIngridentActions =
  | IGetIngredientsSuccess
  | IAddBuns
  | ISetToConstructor
  | IResetBuns
  | ISetModal;

export const setBun = (payload: Array<TIngredientData>): IAddBuns => ({
  type: SET_BUN,
  payload,
});

export const selectAll = (data: TIngredientData): ISetToConstructor => ({
  type: SET_ALL_TO_CONSTRUCTOR,
  all: data,
});

export const resetBuns = (): IResetBuns => ({
  type: RESET_BUNS,
});

export const setModalEmpty: AppThunk = () => (dispatch) => {
  dispatch(getModalEmpty([]));
};

export const getOrder: AppThunk =
  (number: number) => (dispatch: AppDispatch) => {
    getorder(number)
      .then((res) => {
        dispatch(getModal(res.orders));
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getItems: AppThunk = () => (dispatch) => {
  getIngredients()
    .then((res) => {
      if (res && res.success) {
        dispatch(getIngredient(res.data));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
