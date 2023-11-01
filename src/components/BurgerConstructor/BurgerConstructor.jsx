import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import { ConstructorEl } from "../ConstructorEl/ContructorEl";
import Modal from "../Modal/Modal";
import { ApiConnect } from "../ApiConnect/ApiConnect";
import { MoveContext } from "../../services/Stellar-burger-contex";
import { PriceContext } from "../../services/Stellar-burger-contex";
import { BunStatus } from "../../services/Stellar-burger-contex";
import { SeparateIngContext } from "../../services/Stellar-burger-contex";
import { PostOrder } from "../Api/api";
export function BurgerConstructor(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { moved } = React.useContext(MoveContext);
  const { price } = React.useContext(PriceContext);
  const { bunStatus } = React.useContext(BunStatus);
  const { ing } = React.useContext(SeparateIngContext);
  const [id, setId] = React.useState(0);

  const result = moved.map((item) => item._id);

  const handleClick = () => {
    PostOrder(result)
      .then((data) => {
        let order = data.order.number;
        setId(order);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className={BurgerConstructorStyles.construction_container}>
        {bunStatus ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${ing.bun.name} "верх"`}
            price={ing.bun.price}
            thumbnail={ing.bun.image}
            extraClass={BurgerConstructorStyles.burger_locked}
          />
        ) : null}
        <div className={BurgerConstructorStyles.ingridient_container}>
          {ing.ingredients.map((ingridient) => (
            <ConstructorEl key={ingridient._id} {...ingridient} />
          ))}
        </div>
        {bunStatus ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${ing.bun.name} "низ"`}
            price={ing.bun.price}
            thumbnail={ing.bun.image}
            extraClass={BurgerConstructorStyles.burger_locked}
          />
        ) : null}
      </div>
      <div className={`${BurgerConstructorStyles.price_container} mt-5`}>
        <div className={BurgerConstructorStyles.price}>
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon />
        </div>
        <Button
          onClick={() => {
            handleClick();
            setIsOpen(true);
          }}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <OrderDetails number={id} />
      </Modal>
    </div>
  );
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ApiConnect).isRequired,
};
