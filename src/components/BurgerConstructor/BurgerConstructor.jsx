import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.css";
import { ConstructorEl } from "../ConstructorEl/ContructorEl";
import Modal from "../Modal/Modal";

export function BurgerConstructor(props) {
  const [isOpen, setIsOpen] = useState(false);
  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      setIsOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
  });


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
          {props.data.map((ingridient) => (
            <ConstructorEl key={ingridient._id} {...ingridient} />
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
      <div className={`${BurgerConstructorStyles.price_container} mt-5`}>
        <div className={BurgerConstructorStyles.price}>
          <p className="text text_type_digits-default mr-2">{props.total}</p>
          <CurrencyIcon />
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <OrderDetails />
      </Modal>
    </div>
  );
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      ex: PropTypes.string,
      _id: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
      name: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
    })
  ),
};
