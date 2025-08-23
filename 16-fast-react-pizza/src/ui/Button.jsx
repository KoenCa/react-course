import { Link } from "react-router-dom";

function Button({ children, to, ...buttonProps }) {
  const className =
    "inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:cursor-pointer hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed md:px-6 md:py-4";

  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  return (
    <button className={className} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
