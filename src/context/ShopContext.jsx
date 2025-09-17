import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const deliveryFee = 10;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/api/product/list`);
      if (res.data.success) setProducts(res.data.products);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart
  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.post(`${backendURL}/api/cart/get`, {}, { headers: { token } });
      if (res.data.success) {
        const newCart = [];
        for (const productId in res.data.cartData) {
          for (const size in res.data.cartData[productId]) {
            newCart.push({
              productId,
              size,
              quantity: res.data.cartData[productId][size],
            });
          }
        }
        setCart(newCart);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err.response?.data || err.message);
    }
  };

  // Fetch user orders
  const fetchOrders = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendURL}/api/orders/userorders`, { headers: { token } });
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err.response?.data || err.message);
    }
  };

  useEffect(() => { fetchProducts(); }, []);
  useEffect(() => { if (token) fetchCart(); }, [token]);
  useEffect(() => { if (token) fetchOrders(); }, [token]);
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else { localStorage.removeItem("token"); setCart([]); setOrders([]); }
  }, [token]);

  const addToCart = async (productId, size) => {
    if (!size || !token) return;
    try {
      const res = await axios.post(`${backendURL}/api/cart/add`, { productId, size }, { headers: { token } });
      if (res.data.success) {
        setCart(prev => {
          const existing = prev.find(i => i.productId === productId && i.size === size);
          if (existing) return prev.map(i => i.productId === productId && i.size === size ? { ...i, quantity: i.quantity + 1 } : i);
          return [...prev, { productId, size, quantity: 1 }];
        });
      }
    } catch (err) { console.error(err.response?.data || err.message); }
  };

  const updateCart = async (productId, size, quantity) => {
    if (!token) return;
    try {
      const res = await axios.post(`${backendURL}/api/cart/update`, { productId, size, quantity }, { headers: { token } });
      if (res.data.success) setCart(prev => prev.map(i => i.productId === productId && i.size === size ? { ...i, quantity } : i));
    } catch (err) { console.error(err.response?.data || err.message); }
  };

  const removeFromCart = async (productId, size) => {
    if (!token) return;
    const existing = cart.find(i => i.productId === productId && i.size === size);
    if (!existing) return;
    const newQuantity = existing.quantity - 1;
    try {
      const res = await axios.post(`${backendURL}/api/cart/update`, { productId, size, quantity: newQuantity }, { headers: { token } });
      if (res.data.success) {
        if (newQuantity > 0) setCart(prev => prev.map(i => i.productId === productId && i.size === size ? { ...i, quantity: newQuantity } : i));
        else setCart(prev => prev.filter(i => !(i.productId === productId && i.size === size)));
      }
    } catch (err) { console.error(err.response?.data || err.message); }
  };

  const removeItem = (productId, size) => setCart(prev => prev.filter(i => !(i.productId === productId && i.size === size)));

  const getSubtotal = () => cart.reduce((total, item) => {
    const product = products.find(p => p._id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const getTotal = () => getSubtotal() + (cart.length > 0 ? deliveryFee : 0);

  // Place order: add backend order object to state
  const placeOrder = (orderFromBackend) => {
    setOrders(prev => [orderFromBackend, ...prev]);
    setCart([]);
  };

  return (
    <ShopContext.Provider value={{
      currency,
      deliveryFee,
      products,
      loading,
      cart,
      setCart,
      orders,
      addToCart,
      updateCart,
      removeFromCart,
      removeItem,
      getSubtotal,
      getTotal,
      placeOrder,
      fetchProducts,
      fetchCart,
      fetchOrders,
      backendURL,
      token,
      setToken
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
