import {
  GET_ITEMS_REQUEST,
  SET_ALL_TO_CONSTRUCTOR,
  SET_ING,
  SET_BUN,
  DELETE_ITEM,
} from "../actions/getIngridients";
import { GetIngridients } from "../../components/Api/api";
const initialState = {
  items: [],
  currentTab: "items",
  all: [],
  bun: [],
  ingredients: [],
};

export const ingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        items: action.items,
      };
    }
    case SET_ALL_TO_CONSTRUCTOR: {
      return {
        ...state,
        all: [...state.all, action.all],
      };
    }

    case SET_ING: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredients],
      };
    }
    case SET_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        ingredients: state.ingredients.filter((obj) => obj._id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};

export function getItems() {
  return function (dispatch) {
    GetIngridients().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_REQUEST,
          items: res.data,
        });
      }
    });
  };
}
