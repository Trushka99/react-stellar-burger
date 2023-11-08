import IngridientStyle from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

export const IngredientDetails = (props) => {
  return (
    <div className={IngridientStyle.container}>
      <h2 className={`${IngridientStyle.title} text text_type_main-large`}>
        Детали ингридиента
      </h2>
      <img
        className={IngridientStyle.img}
        src={props.image_large}
        alt="Изображение ингридиента"
      ></img>
      <div>
        <p className="text text_type_main-medium">{props.name}</p>
      </div>
      <ul className={IngridientStyle.flex_row}>
        <li className={IngridientStyle.nutrit}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.calories}
          </p>
        </li>
        <li className={IngridientStyle.nutrit}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.proteins}
          </p>
        </li>
        <li className={IngridientStyle.nutrit}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.fat}
          </p>
        </li>
        <li className={IngridientStyle.nutrit}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
    })
  ),
};
