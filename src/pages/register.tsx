import React, { FC } from "react";

import {
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loginstyles from "./login.module.css";
import { registerUser } from "../utils/api";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../services/auth";
export const RegisterPage: FC = () => {
  let auth: any = useAuth();
  const [user, setValue] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(user.email, user.password, user.name)
      .then(() => navigate("/", { replace: true }))
      .catch((err) => console.log(err));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...user, [e.target.name]: e.target.value });
  };
  if (auth.user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <form onSubmit={register} className={Loginstyles.login_container}>
        <h1 className=" mb-6">Регистрация</h1>
        <Input
          type={"text"}
          value={user.name}
          placeholder={"Имя"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          onChange={onChange}
        />
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
        <Button
          htmlType="submit"
          extraClass={`${Loginstyles.register_button} mb-20`}
        >
          Зарегистрироваться
        </Button>
        <div className={Loginstyles.links}>
          <p>Уже зарегистрированны?</p>
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
