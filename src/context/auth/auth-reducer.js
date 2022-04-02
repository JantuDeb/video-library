export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";
export const initialAuthState = {
  user: null,
  isLogedIn: false,
};
export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case SIGNUP:
      return { ...state, user: payload, isLogedIn: true };
    case LOGOUT:
      return initialAuthState;
    default:
      break;
  }
};
