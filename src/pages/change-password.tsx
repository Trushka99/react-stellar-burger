import React, { FC } from "react";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loginstyles from "./login.module.css";
import { changedPassword } from "../utils/api";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "../utils/hooks";

export const ChangePassword: FC = () => {
  const dispatch = useDispatch();
  const [user, setValue] = React.useState({ password: "", code: "" });

  const navigate = useNavigate();
  const changePass = (e: React.SyntheticEvent) => {
    e.preventDefault();
    changedPassword(user.password, user.code)
      .then(() => navigate("/login", { replace: true }))
      .catch((err) => console.log(err));
  };
  const codeSent = useSelector((store) => store.loginActions.code);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...user, [e.target.name]: e.target.value });
  };

  if (codeSent === false) {
    return <Navigate to="/forgot-password" replace />;
  }
  return (
    <div>
      <form onSubmit={changePass} className={Loginstyles.login_container}>
        <h1>Восстановление пароля</h1>
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
        <Input
          value={user.code}
          type={"text"}
          placeholder={"Код Восстановлеения"}
          name={"code"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          onChange={onChange}
        />

        <Button
          extraClass={`${Loginstyles.reccover_pass_bt} mb-20`}
          htmlType="submit"
        >
          Сохранить
        </Button>
        <div className={Loginstyles.links}>
          <p>Вспомнили пароль?</p>
          <p>
            <Link className={`${Loginstyles.link} ml-2`} to="/login">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
