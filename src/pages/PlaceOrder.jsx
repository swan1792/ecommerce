import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const { cart, getTotal, currency, deliveryFee } = useContext(ShopContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">No items to place an order</h2>
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
            <span>{currency}{getTotal() - deliveryFee}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery Fee</span>
            <span>{currency}{deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{currency}{getTotal()}</span>
          </div>
        </div>

        {/* Shipping Form */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>

          {/* First/Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className="w-full p-3 border rounded-lg mt-3"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Country */}
          <input
            type="text"
            placeholder="Country"
            className="w-full p-3 border rounded-lg mt-3"
          />
        </div>

        {/* Place Order Button */}
        <button className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
