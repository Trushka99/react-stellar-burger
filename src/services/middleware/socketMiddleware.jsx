import { getCookie } from "../cookie";
export const socketMiddleware = (wsUrl, wsActions, auth) => {
  return (store) => {
    let socket = null;
    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const accessToken = getCookie("accessToken");

      if (type === wsInit && auth === false) {
        socket = new WebSocket(wsUrl);
      } else if (type === wsInit && auth === true && accessToken) {
        const accessToken = getCookie("accessToken");
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
