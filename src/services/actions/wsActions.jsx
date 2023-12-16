export const WS_CONNECTION_ORDERS = "WS_CONNECTION_ORDERS";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const GET_PROFILE_ORDERS = "GET_PROFILE_ORDERS"
export const ConnectionSuccess = () => {
  return function (dispatch) {
    dispatch({
      type: WS_CONNECTION_SUCCESS,
    });
  };
};
export const ConnectionClosed = () => {
  return function (dispatch) {
    dispatch({
      type: WS_CONNECTION_CLOSED,
    });
  };
};
export const ConnectionFailed = () => {
  return function (dispatch) {
    dispatch({
      type: WS_CONNECTION_ERROR,
    });
  };
};
export const ConnectionOrders = (item) => {
  return function (dispatch) {
    dispatch({
      type: WS_CONNECTION_ORDERS,
      orders: item,
    });
  };
};

