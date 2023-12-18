import styles from "./Orderdets.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderDets = (data) => {
  const [price, setPrice] = useState(0);
  const location = useLocation();
  const dateOfOrder = data.createdAt;
  const allItems = useSelector((store) => store.Ingredients.items);
  const ingredientsOfOrder = data.ingredients.filter((element, index) => {
    return data.ingredients.indexOf(element) === index;
  });
  useEffect(() => {
    if (allItems.length !== 0) {
      const ingredients = data.ingredients.map((item) =>
        allItems.find((data) => data._id === item)
      );

      const totalPrice = ingredients.reduce(
        (previous, current) => previous + current?.price,
        0
      );
      setPrice(totalPrice);
    }
  }, []);

  return (
    data && (
      <Link
        to={`${location.pathname}/${data.number}`}
        state={{ background: location }}
        className={`${styles.order}`}
      >
        <p
          className={`${styles.orderNumber} text text_type_digits-default`}
        >{`#${data.number}`}</p>
        <p
          className={`${styles.orderDate} text text_type_main-default text_color_inactive`}
        >
          <FormattedDate date={new Date(dateOfOrder)} />
        </p>
        <h4 className={`${styles.orderName} text text_type_main-medium`}>
          {data.name}
        </h4>
        {data.status === "done" ? (
          <p className={`${styles.orderStatus} ${styles.readyText}`}>
            Выполнен
          </p>
        ) : data.status === "pending" ? (
          <p className={styles.orderStatus}>Готовится</p>
        ) : data.status === "created" ? (
          <p className={styles.orderStatus}>Создан</p>
        ) : (
          <p className={styles.orderStatus}>{data.status}</p>
        )}
        <div className={`${styles.image_container}`}>
          {ingredientsOfOrder.slice(0, 4).map((items) => (
            <div key={items} className={`${styles.imageBorder}`}>
              <img
                className={`${styles.image} `}
                src={allItems.filter((item) => item._id === items)[0]?.image}
              />
            </div>
          ))}
        </div>
        <div className={`${styles.orderPrice}`}>
          <p className="text text_type_digits-medium">{price}</p>
          <CurrencyIcon />
        </div>
      </Link>
    )
  );
};
