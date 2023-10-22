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
import { MooveContext } from "../app/app";
import { BunContext } from "../app/app";
import { BunStatus } from "../app/app";
let id;
export const Ingredient = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { moved, setMove } = React.useContext(MooveContext);
  const { bun, setBun } = React.useContext(BunContext);
  const {bunStatus, setStatus} = React.useContext(BunStatus)
  id = props._id;
  const move = () => {
    if (props.type === "bun") {
      setBun(props);
      setStatus(true)
    } else {
      setMove([...moved, props]);
      
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
