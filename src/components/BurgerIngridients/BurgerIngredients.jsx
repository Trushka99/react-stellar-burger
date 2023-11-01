import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsStyle from "./BurgerIngredients.module.css";
import { Ingredient } from "../Ingridient/Ingridient";
import { ApiConnect } from "../ApiConnect/ApiConnect";
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from "../../services/reducers/getIngridients";
export function BurgerIngredients() {
  const items = useSelector(store => store.Ingredients.items);
  const [current, setCurrent] = React.useState("Соусы");
  const dispatch = useDispatch()
  function chooseTab(tab) {
    setCurrent(tab);
  }
  React.useEffect(() => {
    dispatch(getItems ())
  }, [dispatch]);
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
          {items.map((ingridient) => (
            <Ingredient key={ingridient._id} {...ingridient} ex="bun" />
          ))}
        </div>
        <h1>Соусы</h1>
        <div className={IngridientsStyle.grid}>
          {items.map((ingridient) => (
            <Ingredient key={ingridient._id} {...ingridient} ex="sauce" />
          ))}
        </div>
        <h1>Начинки</h1>
        <div className={IngridientsStyle.grid}>
          {items.map((ingridient) => (
            <Ingredient key={ingridient._id} {...ingridient} ex="main" />
          ))}
        </div>
      </div>
    </div>
  );
}
BurgerIngredients.propTypes = {
  value: PropTypes.arrayOf(ApiConnect).isRequired,
};
