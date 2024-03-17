import { Link } from 'react-router-dom'

function CartOverview() {
  return (
    <div className="cart-overview">
      <p className="cart-overview__content">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link className="cart-overview__link" to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  )
}

export default CartOverview
