import React, { FC } from "react";
import { TIngredientData } from "../../utils/types";
import { useState } from "react";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import { ConstructorEl } from "../ConstructorEl/ContructorEl";
import { Modal } from "../Modal/Modal";
import { useSelector, useDispatch } from "../../utils/hooks";
import { useDrop } from "react-dnd";
import { setBun } from "../../services/actions/getIngridients";
import {
  setPrice,
  setOrderNumber,
  resetIngredients,
} from "../../services/actions/constructor";
import { v4 as uuidv4 } from "uuid";

import { selectIngredient } from "../../services/actions/constructor";
import { selectAll, resetBuns } from "../../services/actions/getIngridients";
import { useAuth } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../utils";
export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const Buns = useSelector((store: RootState) => store.Ingredients.bun);
  const bun = Buns[0];
  const Ing = useSelector((store) => store.burgerConstructor.ingredients);
  const Total = useSelector((store) => store.Ingredients.all);
  const Order = useSelector((store) => store.burgerConstructor.ordernumber);
  const price = useSelector((store) => store.burgerConstructor.price);
  const dispatch = useDispatch();
  const result = Total.map((item: TIngredientData) => item._id);
  const moveItem = (item: TIngredientData) => {
    dispatch(selectAll(item));

    if (item.type === "bun") {
      dispatch(setBun([item, item]));
      dispatch(setPrice(price + item.price * 2));
    } else {
      dispatch(selectIngredient({ ...item, Id: uuidv4() }));

      dispatch(setPrice(price + item.price));
    }
  };
  const canselModal = () => {
    setIsOpen(false);

    dispatch(resetIngredients());
    dispatch(resetBuns());
    dispatch(setPrice(0));
  };
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: TIngredientData) {
      // Отправим экшен с текущим перетаскиваемым элементом и названием доски
      moveItem(item);
    },
  });

  const handleClick = () => {
    if (!auth.user) {
      return navigate("/login");
    }
    if (auth.user) {
      dispatch(setOrderNumber(result));
    }
  };

  return (
    <div>
      <div
        ref={dropTarget}
        className={BurgerConstructorStyles.construction_container}
      >
        {Buns.length >= 1 ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun["name"]} "верх"`}
            price={bun["price"]}
            thumbnail={bun["image"]}
            extraClass={BurgerConstructorStyles.burger_locked}
          />
        ) : (
          <div>
            <h1>Добавьте булку</h1>
          </div>
        )}

        {Ing.length >= 1 ? (
          <div className={BurgerConstructorStyles.ingridient_container}>
            {Ing.map((ingridient: TIngredientData, index: number) => (
              <ConstructorEl
                index={index}
                key={ingridient.Id}
                props={ingridient}
              />
            ))}
          </div>
        ) : (
          <div>
            <h1>Добавьте ингридиенты</h1>
          </div>
        )}
        {Buns.length >= 1 ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun["name"]} "низ"`}
            price={bun["price"]}
            thumbnail={bun["image"]}
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
          <CurrencyIcon type="primary" />
        </div>
        <Button
          disabled={!(Buns.length >= 1 && Ing.length >= 1)}
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
      </div>
      {isOpen && (
        <Modal onClose={() => canselModal()}>
          <OrderDetails number={Order} />
        </Modal>
      )}
    </div>
  );
};
