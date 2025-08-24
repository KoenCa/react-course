import { Link } from "react-router-dom";

function Button({ to, type, children, ...buttonProps }) {
  const baseStyles =
    "inline-block rounded-full bg-yellow-400  font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:cursor-pointer hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed";

  const styles = {
    primary: `${baseStyles} px-4 py-3 md:px-6 md:py-4`,
    small: `${baseStyles} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button className={styles[type]} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
