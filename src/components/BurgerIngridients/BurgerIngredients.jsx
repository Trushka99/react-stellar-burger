import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsStyle from "./BurgerIngredients.module.css";
import { Ingredient } from "../Ingridient/Ingridient";

export function BurgerIngredients(props) {
  return (
    <div>
      <div className={IngridientsStyle.tabs_container}>
        <Tab>Булки</Tab>
        <Tab>Соусы</Tab>
        <Tab>Начинки</Tab>
      </div>
      <div className={IngridientsStyle.container}>
        <h1>Булки</h1>
        <div className={IngridientsStyle.grid}>
          {props.data.map((ingridient) => (
            <Ingredient key={ingridient._id} {...ingridient} ex="bun" />
          ))}
        </div>
        <h1>Соусы</h1>
        <div className={IngridientsStyle.grid}>
          {props.data.map((ingridient) => (
            <Ingredient key={ingridient._id} {...ingridient} ex="sauce" />
          ))}
        </div>
        <h1>Начинки</h1>
        <div className={IngridientsStyle.grid}>
          {props.data.map((ingridient) => (
            <Ingredient key={ingridient._id} {...ingridient} ex="main" />
          ))}
        </div>
      </div>
    </div>
  );
}
BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
};
