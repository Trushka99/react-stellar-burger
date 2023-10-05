import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientStyle from "./Ingridient.module.css";
import PropTypes from 'prop-types';

export const Ingridient = (props) => {
  if (props.type === props.ex) {
    return (
      <div className={IngridientStyle.item} key={props._id}>
        <img src={props.image} className="ml-4 mr-4"></img>
        <div className={IngridientStyle.price_container}>
          <p className="text text_type_digits-default mt-1 mb-1 pr-2">
            {props.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.name}</p>
        <Counter count={1} size="default" extraClass="m-1"/>
      </div>
      
    );
  } else {
    return null;
  }
};

Ingridient.propTypes = {
  type: PropTypes.string,
  ex: PropTypes.string,
  _id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};
