import React from "react";
import PropTypes from 'prop-types';

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import { ConstructorEl } from "../ConstructorEl/ContructorEl";

export class BurgerConstructor extends React.Component {
  render() {
    const data = this.props.data;

    return (
      <div>
        <div className={BurgerConstructorStyles.construction_container}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
            extraClass={BurgerConstructorStyles.burger_locked}
          />
          <div className={BurgerConstructorStyles.ingridient_container}>
            {data.map((ingridient) => (
              <ConstructorEl {...ingridient} />
            ))}
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
            extraClass={BurgerConstructorStyles.burger_locked}
          />
        </div>
        <div
          className="mt-5"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <p className="text text_type_digits-default mt-1 mb-1 pr-2">610</p>
            <CurrencyIcon />
          </div>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  }
}
BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
};
