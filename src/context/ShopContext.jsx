import React, { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFee = 10;

  // 🛒 Cart state
  const [cart, setCart] = useState([]);

  // ➕ Add to cart
  const addToCart = (productId, size) => {
    if (!size) return; // prevent adding without size
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === productId && item.size === size
      );
      if (existingItem) {
        // If same product+size exists, increase quantity
        return prevCart.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Otherwise add new item
        return [...prevCart, { productId, size, quantity: 1 }];
      }
    });
  };

  // ➖ Remove from cart
  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ❌ Remove item completely
  const removeItem = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.productId === productId && item.size === size)
      )
    );
  };

  // 💰 Calculate subtotal
  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p._id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  // 📦 Total including delivery
  const getTotal = () => {
    return getSubtotal() + (cart.length > 0 ? deliveryFee : 0);
  };

  const value = {
    currency,
    deliveryFee,
    products,
    cart,
    addToCart,
    removeFromCart,
    removeItem,
    getSubtotal,
    getTotal,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
