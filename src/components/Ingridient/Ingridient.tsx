import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientStyle from "./Ingridient.module.css";
import { useDrag } from "react-dnd";
import { TIngredientData } from "../../utils/types";
import { Link, useLocation } from "react-router-dom";
import React, { FC } from "react";

export const Ingredient: FC<{
  props: TIngredientData;
  mealType: string;
  count: number;
}> = ({ props, mealType, count }) => {
  const location = useLocation();
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: props,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  if (props.type === mealType) {
    return (
      <Link
        to={`/ingredients/${props._id}`}
        state={{ background: location }}
        style={{ opacity }}
        ref={dragRef}
        className={IngridientStyle.item}
      >
        <img
          src={props.image}
          className="ml-4 mr-4"
          alt="Изображение ингридиента"
        ></img>
        <div className={IngridientStyle.price_container}>
          <p className="text text_type_digits-default mt-1 mb-1 pr-2">
            {props.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.name}</p>
        <Counter count={count} size="default" extraClass="m-1" />
      </Link>
    );
  }
  return null;
};
