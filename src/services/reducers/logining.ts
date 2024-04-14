import { SET_PROFILE, SET_CODE_STATUS } from "../actions/logining";
import { TLogintActions } from "../actions/logining";
import { TUserData } from "../../utils/types";
export type TLoginState = {
  code: boolean;
  profile: TUserData;
};

const initialState: TLoginState = {
  code: false,
  profile: {
    email: "",
    name: "",
  },
};

export const loginReducer = (
  state = initialState,
  action: TLogintActions
): TLoginState => {
  switch (action.type) {
    case SET_CODE_STATUS: {
      return {
        ...state,
        code: true,
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
