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
import { useDrop } from "react-dnd";
import {
  SET_ALL_TO_CONSTRUCTOR,
  SET_BUN,
} from "../../services/actions/getIngridients";
import {
  SET_PRICE,
  SET_ING_STATUS,
  SET_BUN_STATUS,
} from "../../services/actions/constructor";
import { v4 as uuidv4 } from "uuid";
import { selectIngredient } from "../../services/reducers/constructor";
export function BurgerConstructor() {
  const [isOpen, setIsOpen] = useState(false);

  const Bun = useSelector((store) => store.Ingredients.bun);
  const Ing = useSelector((store) => store.Constructor.ingredients);
  const Total = useSelector((store) => store.Ingredients.all);
  const Order = useSelector((store) => store.Constructor.ordernumber);
  const bunstatus = useSelector((store) => store.Constructor.bunstatus);
  const ingstatus = useSelector((store) => store.Constructor.ingStatus);
  const price = useSelector((store) => store.Constructor.price);
  const dispatch = useDispatch();
  const result = Total.map((item) => item._id);
  const moveItem = (item) => {
    dispatch({
      type: SET_ALL_TO_CONSTRUCTOR,
      all: item,
    });

    if (item.type === "bun") {
      dispatch({
        type: SET_BUN_STATUS,
        bunstatus: true,
      });
      dispatch({
        type: SET_BUN,
        bun: item,
      });
      dispatch({
        type: SET_PRICE,
        price: price + item.price * 2,
      });
    } else {
      dispatch({
        type: SET_ING_STATUS,
        ingStatus: true,
      });
      dispatch(selectIngredient(uuidv4(), item));

      dispatch({
        type: SET_PRICE,
        price: price + item.price,
      });
    }
  };
  const [{ isHover }, dropTarget] = useDrop({
    accept: "animal",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      // Отправим экшен с текущим перетаскиваемым элементом и названием доски
      moveItem(item);
    },
  });

  const handleClick = () => {
    PostOrder(result)
      .then((data) => {
        let order = data.order.number;
        dispatch({
          type: SET_ORDER_NUMBER,
          ordernumber: order,
        });
      })

      .catch((e) => {
        console.log(e);
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
