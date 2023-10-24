import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientStyle from "./Ingridient.module.css";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { MoveContext } from "../../services/Stellar-burger-contex";
import { BunStatus } from "../../services/Stellar-burger-contex";
import { SeparateIngContext } from "../../services/Stellar-burger-contex";
import { PriceContext } from "../../services/Stellar-burger-contex";
export const Ingredient = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { moved, setMove } = React.useContext(MoveContext);
  const { setStatus } = React.useContext(BunStatus);
  const { ing, setIng } = React.useContext(SeparateIngContext);
  const { price, setPrice } = React.useContext(PriceContext);

  const move = () => {
    if (props.type === "bun") {
      setMove([...moved, props]);
      setIng({ ...ing, bun: props });
      setPrice(price + props.price * 2);

      setStatus(true);
    } else {
      setMove([...moved, props]);
      setIng({ ...ing, ingredients: [...ing.ingredients, props] });
      setPrice(price + props.price);
    }
  };
  if (props.type === props.ex) {
    return (
      <div onClick={() => move()} className={IngridientStyle.item}>
        <img
          onClick={() => setIsOpen(true)}
          src={props.image}
          className="ml-4 mr-4"
        ></img>
        <div className={IngridientStyle.price_container}>
          <p className="text text_type_digits-default mt-1 mb-1 pr-2">
            {props.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.name}</p>
        <Counter count={1} size="default" extraClass="m-1" />
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <IngredientDetails {...props} />
        </Modal>
      </div>
    );
  }
  return null;
};

Ingredient.propTypes = {
  type: PropTypes.string,
  ex: PropTypes.string,
  _id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};
