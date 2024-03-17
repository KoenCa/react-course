import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />

      <Username />
    </header>
  )
}

export default Header
