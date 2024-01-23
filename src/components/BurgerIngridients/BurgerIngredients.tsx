import React, { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsStyle from "./BurgerIngredients.module.css";
import { Ingredient } from "../Ingridient/Ingridient";
import { useSelector } from "../../utils/hooks";
import { useInView } from "react-intersection-observer";
import { TIngredientData } from "../../utils/types";
export const BurgerIngredients: FC = () => {
  const Bun = useSelector((store) => store.Ingredients.bun);
  const items = useSelector((store) => store.Ingredients.items);

  const [current, setCurrent] = React.useState("Соусы");

  const allIngredients = useSelector(
    (store) => store.burgerConstructor.ingredients
  );

  function chooseTab(tab: string) {
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
  }, [scrolledBuns, scrolleSause, scrolledInner]);
  return (
    <div>
      <div className={IngridientsStyle.tabs_container}>
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={() => chooseTab("Булки")}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={() => chooseTab("Соусы")}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={() => chooseTab("Начинки")}
        >
          Начинки
        </Tab>
      </div>
      <div className={IngridientsStyle.container}>
        <h1>Булки</h1>
        <div ref={buns} className={IngridientsStyle.grid}>
          {items.map((ingridient: TIngredientData) => (
            <Ingredient
              count={
                Bun.filter(
                  (item: TIngredientData) => item._id === ingridient._id
                ).length
              }
              key={ingridient._id}
              props={ingridient}
              mealType="bun"
            />
          ))}
        </div>
        <h1>Соусы</h1>
        <div ref={sause} className={IngridientsStyle.grid}>
          {items.map((ingridient: TIngredientData) => (
            <Ingredient
              count={
                allIngredients.filter(
                  (item: TIngredientData) => item._id === ingridient._id
                ).length
              }
              key={ingridient._id}
              props={ingridient}
              mealType="sauce"
            />
          ))}
        </div>
        <h1>Начинки</h1>
        <div ref={inner} className={IngridientsStyle.grid}>
          {items.map((ingridient: TIngredientData) => (
            <Ingredient
              count={
                allIngredients.filter(
                  (item: TIngredientData) => item._id === ingridient._id
                ).length
              }
              key={ingridient._id}
              props={ingridient}
              mealType="main"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
