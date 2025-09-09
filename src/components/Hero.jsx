import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
    return (
        // Main container for the Hero section
        <div className='flex flex-col sm:flex-row border-4 border-double border-red-400'> {/* Added flex and flex-col/sm:flex-row for ordering */}

            {/* Hero Section Left Side (Text Content) - Now appearing second in code for visual left side */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-1 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[3px] bg-[#414141]'></p>
                        <p className='font-medium text-sm mid:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed prata-regular'>Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm mid:text-base'>SHOP NN</p>
                        <p className='w-8 md:w-11 h-[3px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>

            {/* Hero Section Right Side (Image) - Now appearing first in code for visual right side */}
            <img
                className='w-full sm:w-1/2' // Still takes full width on mobile, half on desktop
                src={assets.hero_img}
                alt="Hero Image" // Added a more descriptive alt text
            />
        </div>
    )
}

export default Hero