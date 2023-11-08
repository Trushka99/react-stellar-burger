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
import { postOrder } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { setBun } from "../../services/actions/getIngridients";
import {
  SET_PRICE,
  setIngStatus,
  setBunStatus,
  setOrderNumber,
  resetIngredients,
} from "../../services/actions/constructor";
import { v4 as uuidv4 } from "uuid";
import { selectIngredient } from "../../services/actions/constructor";
import { selectAll, resetBuns } from "../../services/actions/getIngridients";
export function BurgerConstructor() {
  const [isOpen, setIsOpen] = useState(false);

  const Bun = useSelector((store) => store.Ingredients.bun);
  const Ing = useSelector((store) => store.burgerConstructor.ingredients);
  const Total = useSelector((store) => store.Ingredients.all);
  const Order = useSelector((store) => store.burgerConstructor.ordernumber);
  const bunstatus = useSelector((store) => store.burgerConstructor.bunstatus);
  const ingstatus = useSelector((store) => store.burgerConstructor.ingStatus);
  const price = useSelector((store) => store.burgerConstructor.price);
  const dispatch = useDispatch();
  const result = Total.map((item) => item._id);
  const moveItem = (item) => {
    dispatch(selectAll(uuidv4(), item));

    if (item.type === "bun") {
      dispatch(setBunStatus(true));
      dispatch(setBun(item));
      dispatch({
        type: SET_PRICE,
        price: price + item.price * 2,
      });
    } else {
      dispatch(setIngStatus(true));
      dispatch(selectIngredient(uuidv4(), item));

      dispatch({
        type: SET_PRICE,
        price: price + item.price,
      });
    }
  };
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      // Отправим экшен с текущим перетаскиваемым элементом и названием доски
      moveItem(item);
    },
  });

  const handleClick = () => {
    postOrder(result)
      .then((data) => {
        let order = data.order.number;
        dispatch(setOrderNumber(order));
      })
      .then(() => {
        dispatch(resetIngredients());
        dispatch(resetBuns());
        dispatch(setBunStatus(false));
        dispatch(setIngStatus(false));
        dispatch({
          type: SET_PRICE,
          price: 0,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        ref={dropTarget}
        className={BurgerConstructorStyles.construction_container}
      >
        {bunstatus ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${Bun.name} "верх"`}
            price={Bun.price}
            thumbnail={Bun.image}
            extraClass={BurgerConstructorStyles.burger_locked}
          />
        ) : (
          <div>
            <h1>Добавьте булку</h1>
          </div>
        )}

        {ingstatus ? (
          <div className={BurgerConstructorStyles.ingridient_container}>
            {Ing.map((ingridient, index) => (
              <ConstructorEl
                index={index}
                key={ingridient.Id}
                {...ingridient}
              />
            ))}
          </div>
        ) : (
          <div>
            <h1>Добавьте ингридиенты</h1>
          </div>
        )}
        {bunstatus ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${Bun.name} "низ"`}
            price={Bun.price}
            thumbnail={Bun.image}
            extraClass={BurgerConstructorStyles.burger_locked}
          />
        ) : (
          <div>
            <h1>Добавьте булку</h1>
          </div>
        )}
      </div>
      <div className={`${BurgerConstructorStyles.price_container} mt-5`}>
        <div className={BurgerConstructorStyles.price}>
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon />
        </div>
        {bunstatus && ingstatus ? (
          <Button
            onClick={() => {
              setIsOpen(true);

              handleClick();
            }}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        ) : (
          <Button
            disabled
            onClick={() => {
              setIsOpen(true);

              handleClick();
            }}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        )}
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <OrderDetails number={Order} />
        </Modal>
      )}
    </div>
  );
}
