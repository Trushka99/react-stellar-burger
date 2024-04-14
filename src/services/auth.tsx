import React, { useContext, useState, createContext } from "react";
import { deleteCookie, setCookie } from "./cookie";
import { login, logout } from "../utils/api";
import { getUser } from "../utils/api";
import { TUserData } from "../utils/types";

const AuthContext = createContext<ReturnType<typeof useProvideAuth>>(
  {} as ReturnType<typeof useProvideAuth>
);

export function ProvideAuth({ children }: { children: React.ReactElement }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState<TUserData>();
  const getUse = () => {
    getUser()
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
        return data.success;
      })
      .catch((err) => console.log(err));
  };

  const signIn = (form: { email: string; password: string }) => {
    login(form)
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken?.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
          setUser(res.user);
        }
      })
      .catch((err) => console.log(err));
  };

  const signOut = async () => {
    await logout().catch((err) => console.log(err));
    // Удаляем пользователя из хранилища
    setUser(undefined);
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
