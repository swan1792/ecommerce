// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Collection from "./pages/Collection";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Order from "./pages/Orders";
// import PlaceOrder from "./pages/PlaceOrder";
// import Navbar from "./components/Navbar";
// import ProductDetail from "./pages/ProductDetail";

// const App = () => {
//   return (
//     <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
//       <Navbar/>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/collection" element={<Collection />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/orders" element={<Order />} />
//         <Route path="/placeOrder" element={<PlaceOrder />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Order from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Navbar from "./components/Navbar";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";

// ✅ Load your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      {/* ✅ Wrap your routes inside Elements provider */}
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Elements>
    </div>
  );
};

export default App;
