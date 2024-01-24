import { TOrderData } from "../../utils/types";

export const WS_CONNECTION_ORDERS: "WS_CONNECTION_ORDERS" =
  "WS_CONNECTION_ORDERS";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const GET_PROFILE_ORDERS: "GET_PROFILE_ORDERS" = "GET_PROFILE_ORDERS";

export interface IWsSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsError {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: string;
}

export interface IWsClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsGetOrders {
  readonly type: typeof WS_CONNECTION_ORDERS;
  payload: { orders: Array<TOrderData>; total: number; totalToday: number };
}
export interface IWsGetProfileOrders {
  readonly type: typeof GET_PROFILE_ORDERS;
  payload: { orders: Array<TOrderData>; total: number; totalToday: number };
}

export type TWsActions =
  | IWsSuccess
  | IWsError
  | IWsClosed
  | IWsStart
  | IWsGetOrders
  | IWsGetProfileOrders;
