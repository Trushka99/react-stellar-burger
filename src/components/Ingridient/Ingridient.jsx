import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientStyle from "./Ingridient.module.css";
import PropTypes from "prop-types";
import Modal from '../Modal/Modal'
import { useState } from 'react'
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";

export const Ingredient = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  if (props.type === props.ex) {
    return (
      <div className={IngridientStyle.item}>
        <img onClick={() => setIsOpen(true)} src={props.image} className="ml-4 mr-4"></img>
        <div className={IngridientStyle.price_container}>
          <p className="text text_type_digits-default mt-1 mb-1 pr-2">
            {props.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.name}</p>
        <Counter count={1} size="default" extraClass="m-1" />
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <IngredientDetails {...props}/>
        </Modal>
      </div>
    );
  } else {
    return null;
  }
};

Ingredient.propTypes = {
  type: PropTypes.string,
  ex: PropTypes.string,
  _id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};
