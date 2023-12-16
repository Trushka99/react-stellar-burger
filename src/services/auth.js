import { useContext, useState, createContext } from "react";
import { deleteCookie, setCookie } from "./cookie";
import { checkResponse, checkSuccess } from "../utils/api";
import { login, logout } from "../utils/api";
import { stateProfile } from "./actions/logining";
import { getUser } from "../utils/api";
import { useDispatch } from "react-redux";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const getUse = () => {
    getUser()
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          dispatch(stateProfile(data.user));
        }
        return data.success;
      })
      .catch((err) => console.log(err));
  };

  const signIn = (form) => {
    login(form)
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
          setUser(res.user);
        }
      })
      .catch((err) => console.log(err));
  };

  const signOut = async () => {
    await logout().catch((err) => console.log(err));
    // Удаляем пользователя из хранилища
    setUser(null);
    // Удаляем куку token
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
  };

  return {
    user,
    getUse,
    signIn,
    signOut,
  };
}
