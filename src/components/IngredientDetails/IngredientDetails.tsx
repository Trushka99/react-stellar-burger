import IngridientStyle from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "../../utils/hooks";
import { FC } from "react";
export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const items = useSelector((store) => store.Ingredients.items);

  const ingredientInfo = items.find((item) => item._id === id);

  return !ingredientInfo ? (
    <div>Загрузка данных...</div>
  ) : (
    <div className={IngridientStyle.container}>
      <h2 className={`${IngridientStyle.title} text text_type_main-large`}>
        Детали ингридиента
      </h2>
      <img
        className={IngridientStyle.img}
        src={ingredientInfo.image_large}
        alt="Изображение ингридиента"
      ></img>
      <div>
        <p className="text text_type_main-medium">{ingredientInfo.name}</p>
      </div>
      <ul className={IngridientStyle.flex_row}>
        <li className={IngridientStyle.nutrit}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredientInfo.calories}
          </p>
        </li>
        <li className={IngridientStyle.nutrit}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredientInfo.proteins}
          </p>
        </li>
        <li className={IngridientStyle.nutrit}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredientInfo.fat}
          </p>
        </li>
        <li className={IngridientStyle.nutrit}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredientInfo.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
