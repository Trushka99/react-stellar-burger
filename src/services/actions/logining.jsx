import { getUser } from "../../utils/api";
export const SET_DETAILS = "SET_DETAILS";
export const SET_PROFILE = "SET_PROFILE";
export const SET_CODE_STATUS = "SET_CODE_STATUS";

export const stateDetails = (payload) => {
  return function (dispatch) {
    dispatch({
      type: SET_DETAILS,
      user: payload,
    });
  };
};
export const stateProfile = (payload) => {
  return function (dispatch) {
    dispatch({
      type: SET_PROFILE,
      profile: payload,
    });
  };
};
export const stateCodeStatus = () => {
  return function (dispatch) {
    dispatch({
      type: SET_CODE_STATUS,
    });
  };
};
export const getProfile = () => {
  return function (dispatch) {
    getUser()
      .then((data) =>
        dispatch({
          type: SET_PROFILE,
          profile: data.user,
        })
      )
      .catch((err) => console.log(err));
  };
};
