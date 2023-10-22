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
import { MooveContext } from "../app/app";
import { PriceContext } from "../app/app";
import { BunContext } from "../app/app";
import { DataContext } from "../app/app";
import { BunStatus } from "../app/app";

let id;
export function BurgerConstructor(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { moved, setMove } = React.useContext(MooveContext);
  const { price, setPrice } = React.useContext(PriceContext);
  const { bun, setBun } = React.useContext(BunContext);
  const { data, setData } = React.useContext(DataContext);
  const {bunStatus, setStatus} = React.useContext(BunStatus)

  const result = moved.map((item) => item._id);
  const [id, setId] = React.useState(0);
  const handleClick = () => {
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ingredients: result,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let order = data.order.number;
        setId(order);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    let total = 0;
    if (moved != [] && bun != [] ) {
      moved.map((item) => (total = item.price + bun.price * 2));
    }
    setPrice(total);
  }, [moved, setPrice]);

  return (
    <div>
      <div className={BurgerConstructorStyles.construction_container}>
        { bunStatus ?( <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={BurgerConstructorStyles.burger_locked}
        />) : null}
        <div className={BurgerConstructorStyles.ingridient_container}>
          {moved.map((ingridient) => (
            <ConstructorEl key={ingridient._id} {...ingridient} />
          ))}
        </div>
       { bunStatus ? (<ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={BurgerConstructorStyles.burger_locked}
        />) : null }
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
