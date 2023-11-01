import PropTypes from "prop-types";
import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElStyles from "./ConstructorEl.module.css";
import { DELETE_ITEM } from "../../services/actions/getIngridients";
import { SET_PRICE } from "../../services/actions/constructor";
import { useSelector, useDispatch } from "react-redux";
export const ConstructorEl = (props) => {
  const price = useSelector((store) => store.Constructor.price)
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch({
      type: DELETE_ITEM,
      payload: props._id,
    });
    dispatch({
      type: SET_PRICE,
      price: price - props.price,
    });
  };
  if (props.type !== "bun") {
    return (
      <div className={ConstructorElStyles.element}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={props.name}
          price={props.price}
          thumbnail={props.image}
          extraClass={ConstructorElStyles.burger_unlocked}
          handleClose={() => onDelete()}
        />
      </div>
    );
  }
  return null;
};

ConstructorEl.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};
