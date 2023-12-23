import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { useEffect } from "react";
import Adminlayout from "./Layout/Adminlayout";
import Banner from "./pages/Admin/Banner";
import Order from "./pages/Admin/Order";
import Product from "./pages/Admin/Product";
import Contacto from "./pages/Admin/Contact";
import Process from "./pages/Admin/Process";

const Layout = () => {
  useEffect(() => {
    function handleContextMenu(e) {
      e.preventDefault();
    }

    const rootElement = document.getElementById("my-app");

    if (rootElement) {
      rootElement.addEventListener("contextmenu", handleContextMenu);

      return () => {
        rootElement.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, []);

  // // For Keyboard Function
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.keyCode === 123) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}>
          <Route path=":cat" element={<Shop />}></Route>
        </Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:pid" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/admin" element={<Layout />}>
        <Route index element={<SignUp />}></Route>
        <Route path="login" element={<SignIn />}></Route>
        <Route path="dash" element={<Adminlayout />}>
          <Route path="banner" element={<Banner />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="order" element={<Order />}></Route>
          <Route path="contact" element={<Contacto />}></Route>
          <Route path="process" element={<Process />}></Route>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      {/* id="my-app" */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
