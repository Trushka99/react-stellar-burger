import { useAuth } from "../services/auth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
export const ProtectedRouteElement = ({ element, needsAuth, needCode }) => {
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
    <Navigate to="/login" replace />
  ) : auth.user && needsAuth === false ? (
    <Navigate to="/" replace />
  ) : (
    element
  );
};
