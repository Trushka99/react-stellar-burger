import {
  SET_PRICE,
  SET_ORDER_NUMBER,
  ADD_TO_CONSTRUCTOR,
  DELETE_FROM_CONSTRUCTOR,
  CONSTRUCTOR_REPLACE,
  RESET_INGREDIENTS
  
} from "../actions/constructor";
import update from 'immutability-helper';

const initialState = {
  ingredients: [],
  price: 0,
  ordernumber: "",
  
};

export const constReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRICE: {
      return {
        ...state,
        price: action.price,
      };
    }
    case SET_ORDER_NUMBER: {
      return {
        ...state,
        ordernumber: action.ordernumber,
      };
    }

    case ADD_TO_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          {
            Id: action.Id,
            ...action.payload,
          },
        ],
      };
    }
    case DELETE_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (obj) => obj.Id !== action.payload
        ),
      };
    }
 
    case CONSTRUCTOR_REPLACE:
      return {
        ...state,
        ingredients: update(state.ingredients, {
          $splice: [
            [action.payload.dragIndex, 1],
            [
              action.payload.hoverIndex,
              0,
              state.ingredients[action.payload.dragIndex],
            ],
          ],
        }),
      };
      case RESET_INGREDIENTS: 
      return {
        ...state,
        ingredients: [],
      }
    default: {
      return state;
    }
  }
};
