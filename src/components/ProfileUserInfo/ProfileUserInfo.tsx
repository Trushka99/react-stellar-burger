import { useDispatch, useSelector } from "../../utils/hooks";
import { useAuth } from "../../services/auth";
import styles from "./ProfileUserInfo.module.css";
import { updateUser } from "../../utils/api";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { stateProfile } from "../../services/actions/logining";
import React, { FC } from "react";
export const ProfileUserInfo: FC = () => {
  const auth = useAuth();
  const [disabled, setDisabled] = React.useState(true);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.loginActions.profile);

  const cancel = () => {
    setDisabled(true);
    dispatch(
      stateProfile({
        email: user.email,
        name: user.name,
      })
    );
  };
  const updateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    updateUser(user);
  };

  const onChange = (e: any) => {
    dispatch(stateProfile({ ...user, [e.target.name]: e.target.value }));
  };
  return (
    <form className={styles.form} onSubmit={updateProfile}>
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
        onChange={() => {}}
        type={"text"}
        value={""}
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
  );
};
