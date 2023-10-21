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