import { ingReducer } from "./getIngridients";
import { constReducer } from "./constructor";
import { combineReducers } from "redux";
import { loginReducer } from "./logining";
import { wsReducer } from "./ws";
export const rootReducer = combineReducers({
  Ingredients: ingReducer,
  burgerConstructor: constReducer,
  loginActions: loginReducer,
  ws: wsReducer,
});
