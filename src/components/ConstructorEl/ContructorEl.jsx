import PropTypes from "prop-types";
import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElStyles from "./ConstructorEl.module.css";
import BurgerConstructorStyles from "../BurgerConstructor/BurgerConstructor.module.css";
import { MooveContext } from "../app/app";

export const ConstructorEl = (props) => {
  const { moved, setMove } = React.useContext(MooveContext);

  if (props.type !== "bun") {
    return (
      <div className={ConstructorElStyles.element}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={props.name}
          price={props.price}
          thumbnail={props.image}
          extraClass={ConstructorElStyles.burger_unlocked}
        />
      </div>
    );
  }
  return (
    <div className={ConstructorElStyles.element}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={props.name}
        price={props.price}
        thumbnail={props.image}
        extraClass={BurgerConstructorStyles.burger_locked}
      />
    </div>
  );
};

ConstructorEl.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};
