import { ingReducer } from "./getIngridients";
import { constReducer } from "./constructor";
import { combineReducers } from "redux";
import { loginReducer } from "./logining";
export const rootReducer = combineReducers({
  Ingredients: ingReducer,
  burgerConstructor: constReducer,
  loginActions: loginReducer,
});
