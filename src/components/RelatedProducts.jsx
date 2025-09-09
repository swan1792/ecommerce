import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCart from "./ProductCart";

const RelatedProducts = ({ currentProduct }) => {
  const { products } = useContext(ShopContext);

  // Filter related products: match both category & subCategory
  const relatedProducts = products.filter(
    (p) =>
      p._id !== currentProduct._id &&
      p.category === currentProduct.category &&
      p.subCategory === currentProduct.subCategory
  );

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Related Products</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((item) => (
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
    </div>
  );
};

export default RelatedProducts;
