export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";
export const LOADING = "LOADING";
export const ERROR = "ERROR";
export const initialAuthState = {
  user: null,
  isLogedIn: false,
  loading:false,
  error:""
};
export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case SIGNUP:
      return { ...state, user: payload.user, isLogedIn: true };
    case LOADING:
      return {...state, loading:payload.loading}
    case ERROR:
      return {...state, error:payload.error}
    case LOGOUT:
      return initialAuthState;
    default:
      break;
  }
};
