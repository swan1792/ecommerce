import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { assets } from "../assets/assets";

const Cart = () => {
  const {
    cart,
    products,
    addToCart,
    removeFromCart,
    removeItem,
    getSubtotal,
    getTotal,
    currency,
    deliveryFee,
  } = useContext(ShopContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <Link
          to="/collection"
          className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  const cartCategories = cart
    .map((item) => {
      const product = products.find((p) => p._id === item.productId);
      return product
        ? { category: product.category, subCategory: product.subCategory }
        : null;
    })
    .filter(Boolean);

  const relatedProducts = products
    .filter((p) => {
      const inCart = cart.find((item) => item.productId === p._id);
      const matches = cartCategories.some(
        (c) => c.category === p.category && c.subCategory === p.subCategory
      );
      return !inCart && matches;
    })
    .slice(0, 8);

  return (
    <div className="min-h-screen px-4 md:px-16 py-10 bg-gray-50">
      {/* Cart Header */}
      <div className="flex justify-center items-center gap-2 p-5">
        <p className="text-xl font-semibold">Your</p>
        <p className="text-xl font-semibold">Cart</p>
        <p className="w-8 md:w-11 h-[3px] bg-[#414141]"></p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          {cart.map((item, index) => {
            const product = products.find((p) => p._id === item.productId);
            if (!product) return null;

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-500">{product.category}</p>
                  <p className="text-gray-700 mt-1">
                    Size: <span className="font-medium">{item.size}</span>
                  </p>
                  <p className="text-gray-700 mt-1">
                    Price: {currency}
                    {product.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item.productId, item.size)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove Item */}
                <button
                  onClick={() => removeItem(item.productId, item.size)}
                  className="ml-4 w-10 h-10 flex items-center justify-center rounded-full 
             bg-gray-100 hover:bg-red-500 transition-colors duration-300
             shadow-sm hover:shadow-md group"
                >
                  <img
                    src={assets.bin_icon}
                    alt="Remove Icon"
                    className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:invert"
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="w-full md:w-80 bg-white p-6 rounded-lg shadow-md h-fit">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>
              {currency}
              {getSubtotal()}
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Delivery Fee</span>
            <span>
              {cart.length > 0 ? currency + deliveryFee : currency + 0}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>
              {currency}
              {getTotal()}
            </span>
          </div>
          <Link to="/placeOrder">
            <button className="w-full py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="p-5">
          <RelatedProducts currentProduct={null} />
        </div>
      )}
    </div>
  );
};

export default Cart;
