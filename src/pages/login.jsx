import {
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loginstyles from "./login.module.css";
import { useNavigate, Navigate, Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../services/auth";
import { stateDetails } from "../services/actions/logining";
import { useSelector, useDispatch } from "react-redux";

export function LoginPage() {
  const user = useSelector((store) => store.loginActions.user);

  const dispatch = useDispatch();
  let auth = useAuth();

  const onChange = (e) => {
    dispatch(stateDetails({ ...user, [e.target.name]: e.target.value }));
  };

  let login = React.useCallback(
    (e) => {
      e.preventDefault();
      auth.signIn(user);
      dispatch(stateDetails(user));
    },
    [auth, user]
  );

  if (auth.user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className={Loginstyles.login_container}>
        <h1>Вход</h1>
        <EmailInput
          placeholder={"Почта"}
          value={user.email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          onChange={onChange}
        />
        <Input
          value={user.password}
          type={"text"}
          placeholder={"Пароль"}
          icon={"ShowIcon"}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          onChange={onChange}
        />
        <Button extraClass={`${Loginstyles.button} mb-20`} onClick={login}>
          Войти
        </Button>
        <div className={Loginstyles.links}>
          <p>Вы - новый пользователь?</p>
          <p>
            <Link className={`${Loginstyles.link} ml-2`} to="/register">
              Зарегистрироваться
            </Link>
          </p>
        </div>
        <div className={Loginstyles.links}>
          <p>Забыли пароль?</p>
          <p>
            <Link className={`${Loginstyles.link} ml-2`} to="/forgot-pass">
              Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
