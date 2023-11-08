import {
  GET_ITEMS_REQUEST,
  SET_ALL_TO_CONSTRUCTOR,
  SET_BUN,
  DELETE_FROM_ALL,
  RESET_BUNS,
} from "../actions/getIngridients";

const initialState = {
  items: [],
  all: [],
  bun: [],
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
        all: [
          ...state.all,
          {
            Id: action.Id,
            ...action.payload,
          },
        ],
      };
    }

    case SET_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }

    case RESET_BUNS: {
      return {
        ...state,
        bun: [],
      };
    }
    default: {
      return state;
    }
  }
};
