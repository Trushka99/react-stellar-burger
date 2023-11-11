import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElStyles from "./ConstructorEl.module.css";
import {
  deleteFromConstructor,
  SET_PRICE,
  moveIngredientInConstructor,
} from "../../services/actions/constructor";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { constructorTypes } from "../../utils/types";
export const ConstructorEl = (props) => {
  const price = useSelector((store) => store.burgerConstructor.price);
  const id = props._id;
  const index = props.index;
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteFromConstructor(props));
    dispatch({
      type: SET_PRICE,
      price: price - props.price,
    });
  };
  const ref = React.useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "const",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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

ConstructorEl.propTypes = constructorTypes.isRequired;
