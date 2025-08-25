import { Link } from "react-router-dom";
import { tw } from "../utils/helpers";

function Button({ to, type, children, ...buttonProps }) {
  const baseStyles = tw`inline-block rounded-full bg-yellow-400 text-sm font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:cursor-pointer hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed`;

  const styles = {
    primary: tw`${baseStyles} px-4 py-3 md:px-6 md:py-4`,
    small: tw`${baseStyles} px-4 py-2 text-xs md:px-5 md:py-2.5`,
    secondary: tw`"inline-block rounded-full border-2 border-stone-300 px-4 py-2.5 text-sm font-semibold tracking-wide text-stone-400 uppercase transition-colors duration-300 hover:cursor-pointer hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:ring-2 focus:ring-stone-200 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed md:px-6 md:py-3.5`,
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button tabIndex={1} className={styles[type]} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
