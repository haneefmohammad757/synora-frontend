import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProducts from "./pages/AllProducts";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Wishlist from "./pages/Wishlist";
import toast from "react-hot-toast";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />


        <Route
    path="/login"
    element={<Auth mode="login" />}
/>

<Route
    path="/register"
    element={<Auth mode="register" />}
/>

        <Route path="/orders" element={<Orders />} />


        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route

path="/admin"

element={

<AdminRoute>

<AdminDashboard/>

</AdminRoute>

}

/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;