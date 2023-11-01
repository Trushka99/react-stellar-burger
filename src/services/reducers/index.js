import { ingReducer } from "./getIngridients";
import { constReducer } from "./constructor";
import { combineReducers } from 'redux';
export const rootReducer = combineReducers({
    Ingredients: ingReducer,
    Constructor: constReducer,
  });