import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/CartConstant";

export const addToCart =
  (productId, qty, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        sizes: data.sizes,
        product: data._id,
        qty,
        size,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    // localStorage.clear()
  };

export const removeFromCart = (productId, itemSize) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      id: productId,
      size: itemSize,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: { data },
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
