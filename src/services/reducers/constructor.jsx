import { SET_PRICE, SET_ORDER_NUMBER, SET_BUN_STATUS } from "../actions/constructor";
const initialState = {
  price: 0,
  ordernumber: '',
  bunstatus: false,
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
    case SET_BUN_STATUS: {
      return {
        ...state,
        bunstatus: action.bunstatus,
      };
    }
    
    default: {
      return state;
    }
  }
};
