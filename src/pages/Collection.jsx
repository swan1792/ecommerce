import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCart from "../components/ProductCart";
import Footer from "../components/Footer";

const Collection = () => {
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { products } = useContext(ShopContext);

  const mainOptions = ["Men", "Women", "Children"];
  const subOptions = ["Topwear", "Bottomwear", "Winterwear"];

  // ✅ Filter logic
  let filteredProducts = products.filter((p) => {
    return (
      (selectedMain ? p.category === selectedMain : true) &&
      (selectedSub ? p.subCategory === selectedSub : true)
    );
  });

  // ✅ Sorting logic
  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Top Nav (mobile only) */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-md sm:hidden">
        <button
          className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-blue-800"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Close" : "Filters"}
        </button>
      </nav>

      {/* ✅ Content Area (Sidebar + Products) */}
      <div className="flex flex-col sm:flex-row flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed sm:static top-0 left-0 h-full w-64 bg-gray-100 p-4 shadow-md transform transition-transform duration-300 z-40 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        >
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Main Options */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Category</h3>
            <ul className="space-y-2">
              {mainOptions.map((option) => (
                <li key={option}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="mainCategory"
                      value={option}
                      checked={selectedMain === option}
                      onChange={() => setSelectedMain(option)}
                    />
                    <span>{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Sub Options */}
          <div>
            <h3 className="font-semibold mb-2">Sub Category</h3>
            <ul className="space-y-2 px-3">
              {subOptions.map((sub) => (
                <li key={sub}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="subCategory"
                      value={sub}
                      checked={selectedSub === sub}
                      onChange={() =>
                        setSelectedSub(selectedSub === sub ? "" : sub)
                      }
                    />
                    <span>{sub}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              setSelectedMain("");
              setSelectedSub("");
              setSortOrder("");
            }}
            className="mt-6 w-full bg-gray-500 text-white py-2 rounded hover:bg-blue-800"
          >
            Reset Filters
          </button>
        </aside>

        {/* ✅ Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 sm:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ✅ Products Section */}
        <main className="flex-1 p-6">
          {/* Sorting Dropdown */}
          <div className="flex items-center justify-end mb-6">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border px-3 py-2 rounded shadow-sm"
            >
              <option value="">Sort by</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <ProductCart
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  image={item.image[0]}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </main>
      </div>

      {/* ✅ Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default Collection;
