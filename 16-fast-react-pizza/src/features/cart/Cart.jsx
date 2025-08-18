import { Link } from "react-router-dom";

function Cart() {
  return (
    <div>
      <Link className="text-sm text-blue-500 hover:text-blue-600 hover:underline" to="/menu">
        &larr; Back to menu
      </Link>

      <h2>Your cart, %NAME%</h2>

      <div>
        <Link to="/order/new">Order pizzas</Link>
        <button>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
