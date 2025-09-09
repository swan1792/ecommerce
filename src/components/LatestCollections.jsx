import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCart from "./ProductCart";

const LatestCollections = () => {
    const { products } = useContext(ShopContext);

    return (
        <div className="px-8 py-10">
            <div className='flex justify-center items-center gap-2 p-5'>
                <p className='w-8 md:w-11 h-[3px] bg-[#414141]'></p>
                <p className='text-xl font-semibold prata-regular'>Latest</p>
                <p className='text-xl font-semibold prata-regular'>Collections</p>
                
            </div>

            {/* <div className="flex flex-wrap sm- justify-center gap-6"> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products && products.length > 0 ? (
                    products.slice(0, 10).map((item) => (
                        <ProductCart
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            category={item.category}
                            price={item.price}
                            image={item.image[0]} // since your product has an array of images
                        />
                    ))
                ) : (
                    <p className="text-center w-full text-gray-500">
                        No products available
                    </p>
                )}
            </div>
        </div>
    );
};

export default LatestCollections;
