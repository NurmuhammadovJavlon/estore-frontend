import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header-menu">
          <Link to="/">
            <img src="../images/logo.svg" alt="" />
          </Link>
          <div className="header-buttons">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping shop-cart">
                {" "}
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </i>
            </Link>
            {userInfo ? (
              <Link to="/" onClick={signoutHandler} title="Akkauntdan chiqish">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </Link>
            ) : (
              <Link to="/signin">
                <i className="fa-solid fa-user-astronaut"></i>
              </Link>
            )}
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route
              path="/product/:id"
              element={<ProductScreen />}
              exact
            ></Route>
            <Route path="/signin" element={<SigninScreen />} exact></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
          </Routes>
        </main>

        <footer className="row center">© All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
