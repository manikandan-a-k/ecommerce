import "./App.css";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import SignUp from "./Pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import ApiRequests from "./ApiRequests";
import Context from "./context";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice.js";
import Admin from "./Pages/Admin.jsx";
import AllUsers from "./Pages/AllUsers.jsx";
import AllProducts from "./Pages/AllProducts.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Cart from "./Pages/Cart.jsx";
import SearchBar from "./Pages/SearchBar.jsx";
axios.defaults.baseURL = "https://ecommerce-backend-5vj1.onrender.com/api";
axios.defaults.withCredentials = true;
function App() {
  const [addToCartCount,setAddToCartCount]=useState(0)
  const disPatch = useDispatch();
  const fetchUser = async () => {
    axios
      .get("/user")
      .then(({ data }) => {
        if (data.success) {
          disPatch(setUserDetails(data.data));
        }
      })
      .catch((err) => console.log(err));
  };
  const countAddToCartProducts = async () => {
    await axios
      .get("/countaddtocartproducts")
      .then(({ data }) => {
        setAddToCartCount(data?.data?.count)
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // User Details
    fetchUser();
    //User Add to Cart
    countAddToCartProducts();
  }, []);
  return (
    <>
      <Context.Provider value={
        { fetchUser,//User Details
          addToCartCount,
          countAddToCartProducts

         }
        }>
        <ToastContainer position="top-center" autoClose={2000} />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            {/* Admin Panel Routes */}
            <Route path="admin" element={<Admin />}>
              <Route path="all-users" element={<AllUsers />}></Route>
              <Route path="all-products" element={<AllProducts />}></Route>
            </Route>
            <Route
              path="product-details/:productId"
              element={<ProductDetails />}
            ></Route>
            <Route path="add-to-cart" element={<Cart/>}></Route>
            <Route path="search" element={<SearchBar/>}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
