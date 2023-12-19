import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./profile.module.css";
import { useAuth } from "../services/auth";
import { getProfile } from "../services/actions/logining";
import { useDispatch } from "react-redux";
export function ProfilePage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [tab, setTab] = useState("Profile");
  const dispatch = useDispatch();

  const logout = React.useCallback(() => {
    auth.signOut().then(() => {
      navigate("/login", { replace: true });
    });
  }, [auth, navigate]);
  React.useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.main_cont}>
        <div className={styles.links_cont}>
          <NavLink
            to="/profile"
            onClick={() => setTab("Profile")}
            className={
              tab === "Profile"
                ? `${styles.link} ${styles.active} text text_type_main-medium`
                : `${styles.link}  text text_type_main-medium`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            onClick={() => {
              setTab("OrderList");
            }}
            className={
              tab === "OrderList"
                ? `${styles.link} ${styles.active} text text_type_main-medium`
                : `${styles.link}  text text_type_main-medium`
            }
          >
            История заказов
          </NavLink>
          <NavLink
            onClick={logout}
            className={`${styles.link} text text_type_main-medium`}
          >
            Выход
          </NavLink>
          <p className={`${styles.text} text text_type_main-default mt-8`}>
            В этом разделе вы можете измменить свои персональные данные
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
