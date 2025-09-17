import {React, useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductCart from './ProductCart'


const BestSellers = ({ text1, text2 }) => {
    const { products } = useContext(ShopContext)

    const bestProducts = products.filter(p => p.bestSeller == true);

    return (
        <div className='p-10'>
            <div className='flex justify-center items-center gap-2 p-5'>
                <p className='text-xl font-semibold prata-regular'>{text1}</p>
                <p className='text-xl font-semibold prata-regular'>{text2}</p>
                <p className='w-8 md:w-11 h-[3px] bg-[#414141]'></p>
            </div>

            {/*  Best Seller Collections */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {bestProducts && bestProducts.length > 0 ? (
                    bestProducts.slice(0, 10).map((item) => (
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




    )
}

export default BestSellers