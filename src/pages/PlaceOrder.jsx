// import React, { useContext, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const PlaceOrder = () => {
//   const { cart, products, getTotal, currency, deliveryFee, backendURL, token, placeOrder } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [details, setDetails] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setDetails({ ...details, [e.target.name]: e.target.value });

//   const handlePlaceOrder = async () => {
//     if (Object.values(details).some((field) => field === "")) {
//       alert("Please fill in all fields");
//       return;
//     }

//     setLoading(true);

//     // Attach product info for display in Orders page
//     const order = {
//       items: cart.map(item => ({
//         ...item,
//         name: products.find(p => p._id === item.productId)?.name || "Product",
//         price: products.find(p => p._id === item.productId)?.price || 0,
//         image: products.find(p => p._id === item.productId)?.image || []
//       })),
//       amount: getTotal(),
//       address: details,
//       paymentMethod,
//     };

//     try {
//       const { data } = await axios.post(`${backendURL}/api/orders/place`, order, { headers: { token } });
//       if (data.success) {
//         placeOrder(data.order); // <-- immediately update orders
//         alert("✅ Order placed successfully!");
//         navigate("/orders");
//       } else {
//         alert(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Server error, please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <h2 className="text-2xl font-semibold mb-4">No items to place an order</h2>
//         <Link to="/collection" className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition">
//           Go Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-4 md:px-16 py-10 bg-gray-50">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-3xl font-bold mb-6">Place Your Order</h2>

//         {/* Order Summary */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
//           <div className="flex justify-between mb-2">
//             <span>Subtotal</span>
//             <span>{currency}{getTotal() - deliveryFee}</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>Delivery Fee</span>
//             <span>{currency}{deliveryFee}</span>
//           </div>
//           <div className="flex justify-between font-bold text-lg">
//             <span>Total</span>
//             <span>{currency}{getTotal()}</span>
//           </div>
//         </div>

//         {/* Shipping Form */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" name="firstName" placeholder="First Name" className="w-full p-3 border rounded-lg" value={details.firstName} onChange={handleChange} />
//             <input type="text" name="lastName" placeholder="Last Name" className="w-full p-3 border rounded-lg" value={details.lastName} onChange={handleChange} />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//             <input type="text" name="phone" placeholder="Phone Number" className="w-full p-3 border rounded-lg" value={details.phone} onChange={handleChange} />
//             <input type="email" name="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" value={details.email} onChange={handleChange} />
//           </div>
//           <input type="text" name="address" placeholder="Address" className="w-full p-3 border rounded-lg mt-3" value={details.address} onChange={handleChange} />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//             <input type="text" name="city" placeholder="City" className="w-full p-3 border rounded-lg" value={details.city} onChange={handleChange} />
//             <input type="text" name="postalCode" placeholder="Postal Code" className="w-full p-3 border rounded-lg" value={details.postalCode} onChange={handleChange} />
//           </div>
//           <input type="text" name="country" placeholder="Country" className="w-full p-3 border rounded-lg mt-3" value={details.country} onChange={handleChange} />
//         </div>

//         {/* Payment Method */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
//           <div className="flex items-center space-x-3">
//             <input type="radio" id="cod" name="paymentMethod" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
//             <label htmlFor="cod">Cash on Delivery</label>
//           </div>
//         </div>

//         <button onClick={handlePlaceOrder} disabled={loading} className={`w-full py-3 text-white rounded-lg transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}>
//           {loading ? "Placing Order..." : "Confirm Order"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;


import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PlaceOrder = () => {
  const { cart, products, getTotal, currency, deliveryFee, backendURL, token, placeOrder } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  // Order payload
  const buildOrder = () => ({
    items: cart.map((item) => ({
      ...item,
      name: products.find((p) => p._id === item.productId)?.name || "Product",
      price: products.find((p) => p._id === item.productId)?.price || 0,
      image: products.find((p) => p._id === item.productId)?.image || [],
    })),
    amount: getTotal(),
    address: details,
    paymentMethod,
  });

  // COD flow
  const handleCOD = async (order) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/orders/place`,
        order,
        { headers: { token } }
      );
      if (data.success) {
        placeOrder(data.order);
        alert("✅ COD Order placed successfully!");
        navigate("/orders");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  // Stripe flow
  const handleStripe = async (order) => {
    try {
      // Step 1: Create order + PaymentIntent
      const { data } = await axios.post(
        `${backendURL}/api/orders/stripe`,
        order,
        { headers: { token } }
      );

      if (!data.success) {
        alert(data.message);
        return;
      }

      const clientSecret = data.clientSecret;
      const orderId = data.order._id;

      // Step 2: Confirm payment with Stripe Elements
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // Step 3: Mark backend order as paid
        await axios.post(
          `${backendURL}/api/orders/mark-paid`,
          { orderId },
          { headers: { token } }
        );
        placeOrder(data.order);
        alert("✅ Stripe Payment successful & Order placed!");
        navigate("/orders");
      }
    } catch (err) {
      console.error(err);
      alert("Stripe payment failed");
    }
  };

  // Main handler
  const handlePlaceOrder = async () => {
    if (Object.values(details).some((field) => field === "")) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    const order = buildOrder();

    if (paymentMethod === "COD") {
      await handleCOD(order);
    } else if (paymentMethod === "Stripe") {
      await handleStripe(order);
    }

    setLoading(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">
          No items to place an order
        </h2>
        <Link
          to="/collection"
          className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-16 py-10 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Place Your Order</h2>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>
              {currency}
              {getTotal() - deliveryFee}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery Fee</span>
            <span>
              {currency}
              {deliveryFee}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>
              {currency}
              {getTotal()}
            </span>
          </div>
        </div>

        {/* Shipping Form */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full p-3 border rounded-lg"
              value={details.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-3 border rounded-lg"
              value={details.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg"
              value={details.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg"
              value={details.email}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-3 border rounded-lg mt-3"
            value={details.address}
            onChange={handleChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full p-3 border rounded-lg"
              value={details.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              className="w-full p-3 border rounded-lg"
              value={details.postalCode}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full p-3 border rounded-lg mt-3"
            value={details.country}
            onChange={handleChange}
          />
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
          <div className="flex items-center space-x-3 mb-2">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
          <div className="flex items-center space-x-3 mb-2">
            <input
              type="radio"
              id="stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Pay with Card (Stripe)</label>
          </div>

          {/* Show CardElement only if Stripe is chosen */}
          {paymentMethod === "Stripe" && (
            <div className="border p-3 rounded mt-2">
              <CardElement />
            </div>
          )}
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full py-3 text-white rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
