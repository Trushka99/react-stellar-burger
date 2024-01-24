import {
  GET_ITEMS_REQUEST,
  SET_ALL_TO_CONSTRUCTOR,
  SET_BUN,
  RESET_BUNS,
  SET_TO_MODAL,
} from "../actions/getIngridients";
import { TIngredientData } from "../../utils/types";
import { TIngridentActions } from "../actions/getIngridients";
export type TIngsState = {
  items: ReadonlyArray<TIngredientData>;
  all: Array<TIngredientData>;
  bun: Array<TIngredientData>;
  ingModal: any | null;
};

const initialState: TIngsState = {
  items: [],
  all: [],
  bun: [],
  ingModal: null,
};

export const ingReducer = (
  state = initialState,
  action: TIngridentActions
): TIngsState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case SET_ALL_TO_CONSTRUCTOR: {
      return {
        ...state,
        all: [
          ...state.all,
          {
            ...action.all,
          },
        ],
      };
    }

    case SET_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }

    case RESET_BUNS: {
      return {
        ...state,
        bun: [],
      };
    }
    case SET_TO_MODAL: {
      return {
        ...state,
        ingModal: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
