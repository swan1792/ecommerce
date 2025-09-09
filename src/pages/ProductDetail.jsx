import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Footer from "../components/Footer";
import RelatedProducts from "../components/RelatedProducts";
import { assets } from "../assets/assets";
import Modal from "../components/Modal";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const product = products.find((item) => item._id === id);
  if (!product) return <p className="text-center py-10">Product not found</p>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setModalMessage("Please select a size before adding to cart!");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000); // auto close
      return;
    }
    addToCart(product._id, selectedSize);
    setModalMessage(`Added ${product.name} (${selectedSize}) to cart!`);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-16 py-10 bg-gray-50">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index}`}
                onClick={() => setSelectedImg(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border transition-transform duration-200 ${
                  selectedImg === img
                    ? "border-black scale-105"
                    : "border-gray-200 hover:border-black hover:scale-105"
                }`}
              />
            ))}
          </div>
          <img
            src={selectedImg || product.image[0]}
            alt={product.name}
            className="w-full md:w-80 h-96 object-cover rounded-lg border"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-500 mt-2">{product.category}</p>
          <p className="text-xl font-semibold mt-4">${product.price}</p>

          {/* Sizes */}
          <div className="mt-6">
            <h4 className="font-semibold">Available Sizes:</h4>
            <div className="flex gap-3 mt-2">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded cursor-pointer transition ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-6 md:mt-auto">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600 transition"
            >
              <img
                src={assets.shopping_cart}
                alt="Add to Cart"
                className="w-5 h-5"
              />
              <span className="font-medium">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
        <div className="border rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-3">Product Description</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
        <div className="border rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-3">Customer Reviews</h3>
          <p className="text-gray-500 italic">
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="p-5">
        <RelatedProducts currentProduct={product} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <Modal
        show={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ProductDetail;
