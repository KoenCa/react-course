import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "./cartSlice";

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector((state) =>
    getCurrentQuantityById(state, pizzaId),
  );

  function handleDecreasePress() {
    dispatch(decreaseItemQuantity(pizzaId));
  }

  function handleIncreasePress() {
    dispatch(increaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={handleDecreasePress}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleIncreasePress}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
