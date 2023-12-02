import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from "./Header.module.css";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className={headerStyle.header}>
      <nav className={headerStyle.nav}>
        <NavLink
          to="/"
          className={`${headerStyle.header_left} pl-5 pr-5 pt-4 pb-4`}
        >
          <BurgerIcon type="primary" />
          <p className={`${headerStyle.text} text text_type_main-defailt pl-2`}>
            Конструктор
          </p>
        </NavLink>
        <NavLink
          to="/"
          className={`${headerStyle.header_left} pl-5 pr-5 pt-4 pb-4`}
        >
          <ListIcon type="secondary" />
          <p className={`${headerStyle.text} text text_type_main-defailt pl-2`}>
            Лента заказов
          </p>
        </NavLink>
      </nav>
      <div className={` ${headerStyle.logo} pt-4 pb-4`}>
        <Logo />
      </div>
      <nav className={headerStyle.nav}>
        <NavLink
          to="/profile"
          className={`${headerStyle.header_left} pl-5 pr-5 pt-4 pb-4`}
        >
          <ProfileIcon type="secondary" />
          <p className={`${headerStyle.text} text text_type_main-defailt pl-2`}>
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  );
}
