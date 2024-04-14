import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_ORDERS,
  WS_CONNECTION_SUCCESS,
  GET_PROFILE_ORDERS,
} from "../actions/wsActions";
import { TWsActions } from "../actions/wsActions";
import { TOrderData } from "../../utils/types";
export type TwsState = {
  wsConnected: boolean;
  wsError: string | undefined;
  orders: TOrderData[];
  total: number;
  totalToday: number;
  profileOrders: TOrderData[];
};
const initialState: TwsState = {
  wsConnected: false,
  wsError: undefined,
  orders: [],
  total: 0,
  totalToday: 0,
  profileOrders: [],
};

export const wsReducer = (
  state = initialState,
  action: TWsActions
) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsError: action.payload,
        wsConnected: false,
      };

    case GET_PROFILE_ORDERS:
      return {
        ...state,
        wsError: undefined,
        profileOrders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_ORDERS:
      return {
        ...state,
        wsError: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
