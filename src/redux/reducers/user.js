import { authTypes } from '../types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case authTypes.LOG_IN.REQUEST:
    case authTypes.LOG_OUT.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case authTypes.LOG_IN.SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        auth: action.payload,
      };

    case authTypes.LOG_OUT.SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
      };

    case authTypes.LOG_IN.FAILURE:
    case authTypes.LOG_OUT.FAILURE:
      return {
        loding: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { userReducer };
