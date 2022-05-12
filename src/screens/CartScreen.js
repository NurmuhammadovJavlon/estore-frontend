import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartAction";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";

export default function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const productId = id;
  const qty = location.search
    ? Number(location.search.split("&")[0].split("=")[1])
    : 1;
  const size = location.search
    ? String(location.search.split("&")[1].split("=")[1])
    : "Mavjud emas";
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size));
    }
  }, [dispatch, productId, qty, size]);
  const removeFromCartHandler = (id, size) => {
    dispatch(removeFromCart(id, size));
    // document.querySelector('.shopping-Page-Product').classList.add('removed');
  };
  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <div className="shopping-cart">
      <div className="col-2">
        <h1 className="shoppingCartTile">
          <b>Sizning Xarid Savatchangiz</b>
        </h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Sizning Xarid Savatchangiz bo'sh <br/>{" "}
            <Link to="/">Go Shopping...</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className={"shopping-Page-Product " + item.product + item.size}>
                <div className="product-card">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small cart-img"
                    ></img>
                  </div>
                  <div className="min-30">
                    <h2>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </h2>
                  </div>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(
                          item.product,
                          Number(e.target.value),
                          item.size
                        )
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <div>
                    <h3 className="size-stayel">Hajmi: {item.size}</h3>
                  </div>
                  <div>
                    <h2>{item.price} so'm</h2>{" "}
                  </div>
                </div>
                <button
                      type="button"
                      className="shoppingCart-button"
                      onClick={(e) => {
                        const parent = e.target.parentNode;
                        console.log(parent);
                          parent.classList.add('removed')
                          
                          setTimeout(() => {
                            removeFromCartHandler(item.product, item.size);
                          }, 200);
                        // 
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="shopping-subtotal">
          <ul>
            <li>
              <h2 className="shopping-subtotal-text">
                <b>
                  {" "}
                  Jami Mahsulotlar ({cartItems.reduce(
                    (a, c) => a + c.qty,
                    0
                  )}{" "}
                  ta) :{" "}
                </b>{" "}
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} so'm
              </h2>
            </li>
            <li>
              <button
                type="button"
                className="button"
                onClick={(e) => {
                  // Navigating
                  if (size !== "def" || size.length === 0) {
                    // Animation
                    let button = document.querySelector(".button");
                    if (!button.classList.contains("loading")) {
                      button.classList.add("loading");

                      setTimeout(() => {
                        button.classList.remove("loading");
                        checkoutHandler();
                      }, 3500);
                    }
                    e.preventDefault();
                  }
                }}
              >
                <span>To'lov qilish</span>
                <div className="cart">
                  <svg viewBox="0 0 36 26">
                    <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
                    <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                  </svg>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
