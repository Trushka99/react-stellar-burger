import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientStyle from "./Ingridient.module.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { useDrag } from "react-dnd";
import { ingridientTypes } from "../../utils/types";
export const Ingredient = (props) => {
 
  const [isOpen, setIsOpen] = useState(false);
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: props,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  if (props.type === props.ex) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        style={{ opacity }}
        ref={dragRef}
        className={IngridientStyle.item}
      >
        <img src={props.image} className="ml-4 mr-4" alt="Изображение ингридиента"></img>
        <div className={IngridientStyle.price_container}>
          <p className="text text_type_digits-default mt-1 mb-1 pr-2">
            {props.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.name}</p>
        <Counter count={props.count} size="default" extraClass="m-1" />
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <IngredientDetails {...props} />
          </Modal>
        )}
      </div>
    );
  }
  return null;
};

Ingredient.propTypes = ingridientTypes.isRequired
