import React, { useEffect } from "react";
import styles from "./feedpage.module.css";
import { Orders } from "../components/Orders/Orders";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/actions/wsActions";
import { useDispatch, useSelector } from "react-redux";

export const Feed = () => {
  const ws = useSelector((store) => store.ws);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);
  return (
    <div className={styles.page}>
      <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
      <div className={styles.mainPage}>
        <Orders data={ws.orders} className={styles.orders_container} />
        <div className={styles.statusesContainer}>
          <div className={styles.columnElement}>
            <div className={styles.digitsRow}>
              <div className={styles.columnElement}>
                <h1>Готов:</h1>
                <ul className={styles.orderNumberList}>
                  {ws.orders.slice(0, 9).map((item) => {
                    if (item.status === "done") {
                      return (
                        <li
                          key={item.number}
                          className={`${styles.readytext} text text_type_digits-default`}
                        >
                          {item.number}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className={styles.columnElement}>
                <h1>В работе:</h1>
                <ul className={styles.orderNumberList}>
                  {ws.orders.slice(0, 9).map((item) => {
                    if (item.status === "pending") {
                      return (
                        <li
                          key={item.number}
                          className="text text_type_digits-default"
                        >
                          {item.number}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
            <h3
              className={`${styles.statsHeader} text text_type_main-medium mt-15`}
            >
              Выполненно за все время:
            </h3>
            <p
              className={`${styles.totalOrdersShadow} text text_type_digits-large`}
            >
              {ws.total}
            </p>
            <h3
              className={`${styles.statsHeader} text text_type_main-medium mt-15`}
            >
              Выполненно за сегодня:
            </h3>
            <p
              className={`${styles.totalOrdersShadow} text text_type_digits-large`}
            >
              {ws.totalToday}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
