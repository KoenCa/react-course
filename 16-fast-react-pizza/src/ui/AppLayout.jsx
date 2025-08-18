import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-4">
      <Header />

      <main className="overflow-scroll">
        <div className="mx-auto max-w-3xl px-4 md:px-0">
          {isLoading && <Loader />}

          <Outlet />
        </div>
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
