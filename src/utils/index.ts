import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../index";
import { TConstructorActions } from "../services/actions/constructor";
import { TLogintActions } from "../services/actions/logining";
import { TIngridentActions } from "../services/actions/getIngridients";
import { rootReducer } from "../services/reducers";

//типизация стора
export type RootState = ReturnType<typeof rootReducer>;

// Все экшены приложения
type TApplicationActions =
  | TConstructorActions
  | TLogintActions
  | TIngridentActions;

// Типизация Redux Thunk
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
