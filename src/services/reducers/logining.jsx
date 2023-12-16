import { SET_DETAILS, SET_PROFILE, SET_CODE_STATUS } from "../actions/logining";

const initialState = {
  user: {
    email: "",
    name: "",
    password: "",
  },
  code: false,
  profile: {
    email: "",
    name: "",
  },
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAILS: {
      return {
        ...state,
        user: action.user,
      };
    }
    case SET_CODE_STATUS: {
      return {
        ...state,
        code: true,
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    default: {
      return state;
    }
  }
};
