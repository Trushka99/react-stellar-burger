import React, { FC } from "react";

import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loginstyles from "./login.module.css";
import { sendPassword } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "../utils/hooks";
import { stateCodeStatus } from "../services/actions/logining";

export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setValue] = React.useState("");

  const requestCode = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendPassword(email)
      .then(() => dispatch(stateCodeStatus()))
      .then(() => navigate("/reset-password", { replace: true }))
      .catch((err) => console.log(err));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={requestCode} className={Loginstyles.login_container}>
        <h1>Восстановление пароля</h1>
        <EmailInput
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          onChange={onChange}
          placeholder="Укажите e-mail"
          required
        />

        <Button
          htmlType="submit"
          extraClass={`${Loginstyles.reccover_pass_bt} mb-20`}
        >
          Восстановить
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
