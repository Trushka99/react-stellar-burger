import React from "react";
import { useNavigate } from "react-router-dom";

import {
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../utils/api";
import { stateProfile } from "../services/actions/logining";
import styles from "./profile.module.css";
import { useAuth } from "../services/auth";
import { updateUser } from "../utils/api";
export function ProfilePage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [disabled, setDisabled] = React.useState(true);

  const dispatch = useDispatch();

  const logout = React.useCallback(() => {
    // Вызовем функцию signOut
    auth.signOut().then(() => {
      // После выхода переадресуем пользователя на маршрут /login
      navigate("/login", { replace: true });
    });
  }, [auth, navigate]);
  React.useEffect(() => {
     getUser();
  }, []);
  const cancel = () => {
    setDisabled(true);
    dispatch(
      stateProfile({
        email: auth.user.email,
        name: auth.user.name,
      })
    );
  };
  const updateProfile = () => {
    setDisabled(true);
    updateUser(user);
  };
  const user = useSelector((store) => store.loginActions.profile);
  const onChange = (e) => {
    dispatch(stateProfile({ ...user, [e.target.name]: e.target.value }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.main_cont}>
        <div className={styles.links_cont}>
          <NavLink
            className={`${styles.link} ${styles.active} text text_type_main-medium`}
          >
            Профиль
          </NavLink>
          <NavLink className={`${styles.link} text text_type_main-medium`}>
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
        <form onSubmit={updateProfile}>
          <Input
            onChange={onChange}
            value={user.name}
            type={"text"}
            placeholder={"имя"}
            icon={"EditIcon"}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-4"
            disabled={disabled}
            onIconClick={() => setDisabled(false)}
          />
          <Input
            onChange={onChange}
            value={user.email}
            type={"text"}
            placeholder={"логин"}
            icon={"EditIcon"}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-4"
            disabled={disabled}
            onIconClick={() => setDisabled(false)}
          />
          <Input
            type={"text"}
            placeholder={"пароль"}
            icon={"EditIcon"}
            name={"password"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-4"
            disabled={disabled}
            onIconClick={() => setDisabled(false)}
          />
          <Button htmlType="button" extraClass="mr-4" onClick={cancel}>
            Отменить
          </Button>
          <Button htmlType="submit">Сохранить</Button>
        </form>
      </div>
    </div>
  );
}
