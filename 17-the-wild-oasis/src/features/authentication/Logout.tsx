import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { ButtonIcon } from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import { SpinnerMini } from "../../ui/SpinnerMini";

export const Logout = () => {
  const { logout, isLoggingOut } = useLogout();

  const handleLogoutBtnPress = () => {
    logout();
  };

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={handleLogoutBtnPress}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};
