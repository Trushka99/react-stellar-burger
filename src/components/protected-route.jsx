import { useAuth } from "../services/auth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCookie } from "../services/cookie";
export const ProtectedRouteElement = ({ element, needsAuth = true }) => {
  const location = useLocation();
  const from = location.state?.from || "/";
  const isLoggedIn = getCookie("accessToken");
  let { getUse } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUse();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }
  return !needsAuth && isLoggedIn ? (
    <Navigate to={from} />
  ) : needsAuth && !isLoggedIn ? (
    <Navigate to="/login" replace state={{ from: location }} />
  ) : (
    element
  );
};
