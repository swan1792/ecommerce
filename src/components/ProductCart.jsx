import React from "react";
import { Link } from "react-router-dom";

const ProductCart = ({ id, name, category, price, image }) => {
  return (
    <Link to={`/product/${id}`} className="group relative w-50">
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition">
        <img
          src={image}
          alt={name}
          className="aspect-square w-full rounded-t-md object-cover group-hover:opacity-75"
        />
        <div className="p-4 flex justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">{name}</h3>
            <p className="mt-1 text-sm text-gray-500">{category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCart;
