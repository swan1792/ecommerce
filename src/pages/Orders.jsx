import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Orders = () => {
  const { orders, currency, products } = useContext(ShopContext);

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">You have no orders</h2>
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
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Shipping & Status */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Order Date</h3>
                <p className="mb-4">{new Date(order.date).toLocaleString()}</p>

                <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
                <p>{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.phone}</p>
                <p>{order.address.email}</p>
                <p>{order.address.address}</p>
                <p>{order.address.city}, {order.address.postalCode}</p>
                <p>{order.address.country}</p>

                <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
                <p>{order.paymentMethod}</p>

                {/* Order Status */}
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Order Status</h3>
                  <p className={`font-bold ${order.status === "Delivered" ? "text-green-600" : order.status === "Shipped" ? "text-blue-600" : "text-orange-600"}`}>
                    {order.status || "Pending"}
                  </p>
                </div>
              </div>

              {/* Right: Order Items */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item, idx) => {
                    const product = products.find(p => p._id === item.productId);
                    if (!product) return null;

                    return (
                      <div key={idx} className="flex items-center">
                        {product.image && product.image[0] && (
                          <img
                            src={product.image[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg mr-4"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p>{currency}{product.price} x {item.quantity}</p>
                          <p>Size: {item.size}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-lg font-bold text-right">Total: {currency}{order.amount}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
