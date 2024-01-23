import OrderStyle from "./OrderDetails.module.css";
import { FC } from "react";
type TorderDets = {
  number: number;
};
export const OrderDetails: FC<TorderDets> = (number) => {
  return (
    <div className={OrderStyle.container}>
      <p className={`${OrderStyle.order_number} text text_type_digits-large`}>
        {number}
      </p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <div className={OrderStyle.checkmark}></div>
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
