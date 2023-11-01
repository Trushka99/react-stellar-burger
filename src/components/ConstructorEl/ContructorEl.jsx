import PropTypes from "prop-types";
import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElStyles from "./ConstructorEl.module.css";
import { SeparateIngContext } from "../../services/Stellar-burger-contex";
import { PriceContext } from "../../services/Stellar-burger-contex";

export const ConstructorEl = (props) => {
  const { ing, setIng } = React.useContext(SeparateIngContext);
  const { price, setPrice } = React.useContext(PriceContext);

  const onDelete = () => {
    setIng({
      ...ing,
      ingredients: ing.ingredients.filter((item) => item._id !== props._id),
    });
    setPrice(price - props.price);
  };
  if (props.type !== "bun") {
    return (
      <div className={ConstructorElStyles.element}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={props.name}
          price={props.price}
          thumbnail={props.image}
          extraClass={ConstructorElStyles.burger_unlocked}
          handleClose={() => onDelete()}
        />
      </div>
    );
  }
  return null;
};

ConstructorEl.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};
