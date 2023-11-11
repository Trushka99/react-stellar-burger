import PropTypes from "prop-types";

export const ApiConnect = PropTypes.shape({
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
});
export const ingridientTypes = PropTypes.shape({
  type: PropTypes.string,
  ex: PropTypes.string,
  _id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
});
export const constructorTypes = PropTypes.shape({
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
});
export const orderDetailsTypes = PropTypes.shape({
  number: PropTypes.number,
});
