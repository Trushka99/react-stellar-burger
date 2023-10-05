import PropTypes from 'prop-types';

import {
    ConstructorElement,
    DragIcon,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import ConstructorElStyles from "./ConstructorEl.module.css";
  

export const ConstructorEl = (props) => {
  return (
    <div className={ConstructorElStyles.element}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.name}
        price={props.price}
        thumbnail={props.image}
        extraClass={ConstructorElStyles.burger_unlocked}
      />
    </div>
  );
};
ConstructorEl.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};