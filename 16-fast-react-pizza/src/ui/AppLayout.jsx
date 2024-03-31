import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader'

function AppLayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <div className="layout">
      {isLoading && <Loader />}

      <Header />

      <section className='layout__main-wrapper'>
        <main className='layout__main-content'>
          <Outlet />
        </main>
      </section>

      <CartOverview />
    </div>
  )
}

export default AppLayout
