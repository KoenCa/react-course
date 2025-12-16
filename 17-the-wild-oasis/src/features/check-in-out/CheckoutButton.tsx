import { Button } from "../../ui/Button";
import { useCheckout } from "./useCheckout";

interface CheckoutButton {
  bookingId: number;
}

export const CheckoutButton = ({ bookingId }: CheckoutButton) => {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
};
