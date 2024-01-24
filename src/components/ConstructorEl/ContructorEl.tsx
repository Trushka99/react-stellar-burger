import React, { FC } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElStyles from "./ConstructorEl.module.css";
import {
  deleteFromConstructor,
  setPrice,
  moveIngredientInConstructor,
} from "../../services/actions/constructor";
import { useSelector, useDispatch } from "../../utils/hooks";
import { useDrag, useDrop } from "react-dnd";
import { TIngredientData } from "../../utils/types";

export const ConstructorEl: FC<{ props: TIngredientData; index: any }> = ({
  props,
  index,
}) => {
  const price = useSelector((store) => store.burgerConstructor.price);
  const id = props._id;
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteFromConstructor(props.Id));
    dispatch(setPrice(price - props.price));
  };
  const ref = React.useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "const",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveIngredientInConstructor({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "const",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  if (props.type !== "bun") {
    return (
      <div
        ref={ref}
        style={{ opacity }}
        className={ConstructorElStyles.element}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          text={props.name}
          price={props.price}
          thumbnail={props.image}
          extraClass={ConstructorElStyles.burger_unlocked}
          handleClose={() => onDelete()}
        />
      </div>
    );
  }
  return null;
};
