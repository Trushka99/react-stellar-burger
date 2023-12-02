import React from "react";

import {
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loginstyles from "./login.module.css";
import { sendPassword } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { stateDetails } from "../services/actions/logining";
import { stateCodeStatus } from "../services/actions/logining";

export function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.loginActions.user);

  const onChange = (e) => {
    dispatch(stateDetails({ ...user, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <div className={Loginstyles.login_container}>
        <h1>Восстановление пароля</h1>
        <EmailInput
          value={user.email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          onChange={onChange}
          placeholder="Укажите e-mail"
        />

        <Button
          extraClass={`${Loginstyles.reccover_pass_bt} mb-20`}
          onClick={() =>
            sendPassword(user.email)
              .then(() => dispatch(stateCodeStatus()))
              .then(() => navigate("/change-pass", { replace: true }))
          }
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
      </div>
    </div>
  );
}
