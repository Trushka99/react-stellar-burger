import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsStyle from "./BurgerIngredients.module.css";
import { Ingredient } from "../Ingridient/Ingridient";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

export function BurgerIngredients() {
  const items = useSelector((store) => store.Ingredients.items);
  const [current, setCurrent] = React.useState("Соусы");
  const dispatch = useDispatch();
  const allIngredients = useSelector(
    (store) => store.burgerConstructor.ingredients
  );

  function chooseTab(tab) {
    setCurrent(tab);
  }

  const [buns, scrolledBuns] = useInView({ threshold: 0 });
  const [sause, scrolleSause] = useInView({ threshold: 0 });
  const [inner, scrolledInner] = useInView({ threshold: 0 });

  React.useEffect(() => {
    if (scrolledBuns) {
      chooseTab("Булки");
    } else if (scrolleSause) {
      chooseTab("Соусы");
    } else if (scrolledInner) {
      chooseTab("Начинки");
    }
  }, [dispatch, scrolledBuns, scrolleSause, scrolledInner]);
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
        <div ref={buns} className={IngridientsStyle.grid}>
          {items.map((ingridient) => (
            <Ingredient key={ingridient._id} {...ingridient} ex="bun" />
          ))}
        </div>
        <h1>Соусы</h1>
        <div ref={sause} className={IngridientsStyle.grid}>
          {items.map((ingridient) => (
            <Ingredient
              count={
                allIngredients.filter((item) => item._id === ingridient._id)
                  .length
              }
              key={ingridient._id}
              {...ingridient}
              ex="sauce"
            />
          ))}
        </div>
        <h1>Начинки</h1>
        <div ref={inner} className={IngridientsStyle.grid}>
          {items.map((ingridient) => (
            <Ingredient
              count={
                allIngredients.filter((item) => item._id === ingridient._id)
                  .length
              }
              key={ingridient._id}
              {...ingridient}
              ex="main"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
