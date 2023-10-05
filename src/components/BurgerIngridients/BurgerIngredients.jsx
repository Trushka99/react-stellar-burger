import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsStyle from "./BurgerIngredients.module.css";
import { Ingredient } from "../Ingridient/Ingridient";

export function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("Соусы");
  function chooseTab(tab) {
    setCurrent(tab);
  }
  return (
    <div>
      <div className={IngridientsStyle.tabs_container}>
        <Tab active={current === "Булки"} onClick={() => chooseTab("Булки")}>
          Булки
        </Tab>
        <Tab active={current === "Соусы"} onClick={() => chooseTab("Соусы")}>
          Соусы
        </Tab>
        <Tab
          active={current === "Начинки"}
          onClick={() => chooseTab("Начинки")}
        >
          Начинки
        </Tab>
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      ex: PropTypes.string,
      _id: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
      name: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
    })
  ),
};
