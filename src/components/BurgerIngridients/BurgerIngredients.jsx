import React from "react";
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsStyle from "./BurgerIngredients.module.css";
import { Ingridient } from "../Ingridient/Ingridient";

export class BurgerIngredients extends React.Component {
  render() {
    const data = this.props.data;

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
            {data.map((ingridient) => (
              <Ingridient {...ingridient} ex="bun" />
            ))}
          </div>
          <h1>Соусы</h1>
          <div className={IngridientsStyle.grid}>
            {data.map((ingridient) => (
              <Ingridient {...ingridient} ex="sauce" />
            ))}
          </div>
          <h1>Начинки</h1>
          <div className={IngridientsStyle.grid}>
            {data.map((ingridient) => (
              <Ingridient {...ingridient} ex="main" />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired
};
