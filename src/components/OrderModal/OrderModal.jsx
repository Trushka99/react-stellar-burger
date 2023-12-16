import { useEffect } from "react";
import styles from "./OrderModal.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import imagestyle from "../Orderdets/Orderdets.module.css";
import { getOrder } from "../../services/actions/getIngridients";
export const OrderModal = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  useEffect(() => {
    dispatch(getOrder(number));
  }, [dispatch]);
  const openedOrder = useSelector((store) => store.Ingredients.ingModal);
  const allItems = useSelector((store) => store.Ingredients.items);
  const orderIngredients = openedOrder[0]?.ingredients.map((item) =>
    allItems.find((data) => data._id === item)
  );
  const totalPrice = orderIngredients?.reduce(
    (previous, current) => previous + current.price,
    0
  );
  const uniqueIngredients = openedOrder[0]?.ingredients.reduce((acc, item) => {
    if (acc.includes(item)) {
      return acc;
    }
    return [...acc, item];
  }, []);
  return !openedOrder ? (
    <div>Загрузка данных..</div>
  ) : (
    <div className={`${styles.modalOrderCont}`}>
      <p
        className={`${styles.orderNumber} text text_type_digits-default mb-10 `}
      >
        #{number}
      </p>

      <h3 className={`${styles.orderName} text text_type_main-medium mb-2`}>
        {openedOrder[0]?.name}
      </h3>
      {openedOrder[0]?.status === "done" ? (
        <p className={`${styles.readyText} text text_type_main-default mb-10`}>
          Выполнен
        </p>
      ) : openedOrder[0]?.status === "pending" ? (
        <p className={` text text_type_main-default`}>Готовится</p>
      ) : openedOrder[0]?.status === "created" ? (
        <p className={` text text_type_main-default`}>Создан</p>
      ) : (
        <p className={` text text_type_main-default`}>
          {openedOrder[0]?.status}
        </p>
      )}

      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`${styles.ingredientsCont} mb-10`}>
        {uniqueIngredients?.map((item) => {
          const ingredientInfo = allItems.find(
            (ingredient) => ingredient._id === item
          );

          return (
            <li className={`${styles.ingredientCard}`} key={item._id}>
              <div className={`${styles.ingredientBox}`}>
                <div className={`${imagestyle.imageBorder}`}>
                  <img
                    className={`${imagestyle.image} `}
                    src={ingredientInfo.image}
                  />
                </div>
                <p className={`text text_type_main-default ml-8`}>
                  {ingredientInfo.name}
                </p>
              </div>
              <p></p>
              <div className={`${styles.ingredientPrice}`}>
                <p className={`text text_type_digits-default mr-2`}>
                  {" "}
                  {
                    openedOrder[0].ingredients.filter(
                      (item) => item == ingredientInfo._id
                    ).length
                  }{" "}
                  X {ingredientInfo.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`${styles.dateAndPrice}`}>
        <p className={`${styles.dateColor} text text_type_main-default `}>
          <FormattedDate date={new Date(openedOrder[0]?.createdAt)} />
        </p>
        <div className={styles.price_container}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
