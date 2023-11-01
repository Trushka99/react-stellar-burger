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
import { PostOrder } from "../Api/api";
import { useSelector, useDispatch } from "react-redux";
import { SET_ORDER_NUMBER } from "../../services/actions/constructor";
export function BurgerConstructor(props) {
  const [isOpen, setIsOpen] = useState(false);
  const Bun = useSelector((store) => store.Ingredients.bun);
  const Ing = useSelector((store) => store.Ingredients.ingredients);
  const Total = useSelector((store) => store.Ingredients.all);
  const Order = useSelector((store) => store.Constructor.ordernumber);
  const status = useSelector((store) => store.Constructor.bunstatus);
  const price = useSelector((store) => store.Constructor.price);

  const dispatch = useDispatch()
  const result = Total.map((item) => item._id);

  const handleClick = () => {
    PostOrder(result)
      .then((data) => {
        let order = data.order.number;
        dispatch({
          type: SET_ORDER_NUMBER,
          ordernumber:order
        })
      })

      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className={BurgerConstructorStyles.construction_container}>
        {status ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${Bun.name} "верх"`}
            price={Bun.price}
            thumbnail={Bun.image}
            extraClass={BurgerConstructorStyles.burger_locked}
          />
        ) : null}
        <div className={BurgerConstructorStyles.ingridient_container}>
          {Ing.map((ingridient) => (
            <ConstructorEl key={ingridient._id} {...ingridient} />
          ))}
        </div>
        {status ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${Bun.name} "низ"`}
            price={Bun.price}
            thumbnail={Bun.image}
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
        <OrderDetails number={Order} />
      </Modal>
    </div>
  );
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ApiConnect).isRequired,
};
