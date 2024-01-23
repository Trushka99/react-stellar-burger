import { useEffect } from "react";
import styles from "./OrderModal.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "../../utils/hooks";
import imagestyle from "../Orderdets/Orderdets.module.css";
import { getOrder } from "../../services/actions/getIngridients";
import React, { FC } from "react";
import { TOrderData } from "../../utils/types";

export type TOrderInfo = {
  data: Array<TOrderData>;
};

export const OrderModal: FC<TOrderInfo> = ({ data }) => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const openedOrder = data.find((item) => item._id === number);
  const allItems = useSelector((store) => store.Ingredients.items);
  const orderIngredients = openedOrder?.ingredients.map((item: string) =>
    allItems!.find((data) => data._id === item)
  );
  const totalPrice = orderIngredients?.reduce(
    (previous: any, current: any) => previous + current.price,
    0
  );
  const uniqueIngredients = openedOrder?.ingredients.reduce(
    (acc: Array<string>, item: string) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item];
    },
    []
  );

  return !openedOrder ? (
    <div>Загрузка данных..</div>
  ) : (
    <div className={`${styles.modalOrderCont}`}>
      <p
        className={`${styles.orderNumber} text text_type_digits-default mb-10 `}
      >
        #{openedOrder?.number}
      </p>

      <h3 className={`${styles.orderName} text text_type_main-medium mb-2`}>
        {openedOrder?.name}
      </h3>
      {openedOrder?.status === "done" ? (
        <p className={`${styles.readyText} text text_type_main-default mb-10`}>
          Выполнен
        </p>
      ) : openedOrder?.status === "pending" ? (
        <p className={` text text_type_main-default`}>Готовится</p>
      ) : openedOrder?.status === "created" ? (
        <p className={` text text_type_main-default`}>Создан</p>
      ) : (
        <p className={` text text_type_main-default`}>{openedOrder?.status}</p>
      )}

      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles.ingredientsCont} mb-10`}>
        {uniqueIngredients?.map((item) => {
          const ingredientInfo = allItems.find(
            (ingredient) => ingredient._id === item
          );

          return (
            <div className={`${styles.ingredientCard}`} key={item}>
              <div className={`${styles.ingredientBox}`}>
                <div className={`${imagestyle.imageBorder}`}>
                  <img
                    className={`${imagestyle.image} `}
                    src={ingredientInfo?.image}
                  />
                </div>
                <p className={`text text_type_main-default ml-8`}>
                  {ingredientInfo?.name}
                </p>
              </div>
              <div className={`${styles.ingredientPrice}`}>
                <p className={`text text_type_digits-default mr-2`}>
                  {" "}
                  {
                    openedOrder.ingredients.filter(
                      (item) => item == ingredientInfo?._id
                    ).length
                  }{" "}
                  X {ingredientInfo?.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          );
        })}
      </div>
      <div className={`${styles.dateAndPrice}`}>
        <p className={`${styles.dateColor} text text_type_main-default `}>
          <FormattedDate date={new Date(openedOrder?.createdAt)} />
        </p>
        <div className={styles.price_container}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
