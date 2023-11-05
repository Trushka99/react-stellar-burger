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
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

export const Ingredient = (props) => {
  const allIngredients = useSelector((store) => store.Ingredients.all);
  const count = allIngredients.filter((item) => item._id === props._id).length;
  const [isOpen, setIsOpen] = useState(false);
  const [{ opacity }, dragRef] = useDrag({
    type: "animal",
    item: props,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  if (props.type === props.ex) {
    return (
      <div style={{ opacity }} ref={dragRef} className={IngridientStyle.item}>
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
        <Counter count={count} size="default" extraClass="m-1" />
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
