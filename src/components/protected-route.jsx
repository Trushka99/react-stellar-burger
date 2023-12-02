import { useAuth } from "../services/auth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export const ProtectedRouteElement = ({ element, needsAuth, needCode }) => {
  const location = useLocation();
  const from = location.state?.from || "/";

  let { getUse, ...auth } = useAuth();
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

  return !auth.user && needsAuth === true ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : auth.user && needsAuth === false ? (
    <Navigate to={from} />
  ) : (
    element
  );
};
