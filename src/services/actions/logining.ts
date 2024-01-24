import { getUser } from "../../utils/api";
import { AppThunk } from "../../utils";
import { TUserData } from "../../utils/types";
export const SET_PROFILE: "SET_PROFILE" = "SET_PROFILE";
export const SET_CODE_STATUS: "SET_CODE_STATUS" = "SET_CODE_STATUS";

export const getProf = (payload: TUserData): IStateWholeProfile => ({
  type: SET_PROFILE,
  payload,
});

export interface IStateProf {
  readonly type: typeof SET_PROFILE;
  payload: TUserData;
}

export interface IStateWholeProfile {
  readonly type: typeof SET_PROFILE;
  payload: TUserData;
}

export interface IStateCodeStatus {
  readonly type: typeof SET_CODE_STATUS;
}

export type TLogintActions = IStateProf | IStateWholeProfile | IStateCodeStatus;

export const stateProfile = (payload: TUserData): IStateProf => ({
  type: SET_PROFILE,
  payload,
});

export const stateCodeStatus = (): IStateCodeStatus => ({
  type: SET_CODE_STATUS,
});

export const getProfile: AppThunk = () => (dispatch) => {
  getUser()
    .then((data) => {
      dispatch(getProf(data.user));
    })
    .catch((err) => {
      console.log(err);
    });
};
