import { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios-instance";
import {
  authReducer,
  ERROR,
  initialAuthState,
  LOADING,
  LOGIN,
  LOGOUT,
  SIGNUP,
} from "./auth-reducer";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const signUp = async (user) => {
    authDispatch({ type: LOADING, payload: { loading: true } });
    try {
      const { data } = await axiosInstance.post("/signup", user);
      if (data.success) {
        authDispatch({ type: SIGNUP, payload: { user: data.user } });
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/", { replace: true });
      }
    } catch (error) {
      authDispatch({ type: ERROR, payload: { error: error.message } });
    } finally {
      authDispatch({ type: LOADING, payload: { loading: false } });
    }
  };


  
  const logIn = async ({ email, password }) => {
    authDispatch({ type: LOADING, payload: { loading: true } });
    try {
      const { data } = await axiosInstance.post("/login", { email, password });
      if (data.success) {
        authDispatch({ type: LOGIN, payload: { user: data.user } });
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate(-1);
      }
    } catch (error) {
      authDispatch({ type: ERROR, payload: { error: error.message } });
    } finally {
      authDispatch({ type: LOADING, payload: { loading: false } });
    }
  };

  const logOut = async () => {
    authDispatch({ type: LOADING, payload: { loading: true } });
    try {
      const { data } = await axiosInstance.get("/logout");
      if (data.success) {
        authDispatch({ type: LOGOUT });
        navigate("/", { replace: true });
      }
    } catch (error) {
      authDispatch({ type: ERROR, payload: { error: error.message } });
    } finally {
      authDispatch({ type: LOADING, payload: { loading: false } });
    }
  };

  const savePhoto = async ({ name, email, file }) => {
    if (!name || !email)
      return authDispatch({
        type: ERROR,
        payload: { error: "Name and email is required" },
      });
    authDispatch({ type: LOADING, payload: { loading: true } });
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    if (file) formData.append("photo", file);
    try {
      const { data } = await axiosInstance.post(
        "user/update_user_details",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        authDispatch({ type: LOGIN, payload: { user: data.user } });
      }
    } catch (error) {
      authDispatch({ type: ERROR, payload: { error: error.message } });
    } finally {
      authDispatch({ type: LOADING, payload: { loading: false } });
    }
  };

  return (
    <AuthContext.Provider
      value={{ authState, savePhoto, logIn, logOut, signUp, authDispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
