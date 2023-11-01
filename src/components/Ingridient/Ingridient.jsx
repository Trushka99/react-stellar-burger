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

import { useSelector, useDispatch } from "react-redux";
import {
  SET_ALL_TO_CONSTRUCTOR,
  SET_ING,
  SET_BUN,
} from "../../services/actions/getIngridients";
import { SET_BUN_STATUS, SET_PRICE } from "../../services/actions/constructor";
export const Ingredient = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const price = useSelector((store) => store.Constructor.price);

  const dispatch = useDispatch();

  const move = () => {
    dispatch({
      type: SET_ALL_TO_CONSTRUCTOR,
      all: props,
    });
    if (props.type === "bun") {
      dispatch({
        type: SET_BUN,
        bun: props,
      });
      dispatch({
        type: SET_BUN_STATUS,
        bunstatus: true,
      });
      dispatch({
        type: SET_PRICE,
        price: price + props.price * 2,
      });
    } else {
      dispatch({
        type: SET_ING,
        ingredients: props,
      });
      dispatch({
        type: SET_PRICE,
        price: price + props.price,
      });
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
