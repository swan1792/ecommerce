import React from 'react'
import { assets } from '../assets/assets'

const Policy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-20 py-16 bg-gray-50">
      
      {/* Card 1 */}
      <div className="flex flex-col items-center text-center max-w-[200px]">
        <img src={assets.exchange_icon} alt="Exchange Policy" className="w-12 h-12 mb-4" />
        <p className="text-lg font-semibold text-gray-800">Easy Exchange Policy</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae earum nulla quis! Sapiente soluta rem nihil illo aliquam. Illum, ipsum. Perspiciatis adipisci voluptatum perferendis? Nobis ea mollitia nulla obcaecati laboriosam.</p>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col items-center text-center max-w-[200px]">
        <img src={assets.quality_icon} alt="Return Policy" className="w-12 h-12 mb-4" />
        <p className="text-lg font-semibold text-gray-800">7 Day Return Policy</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat cumque totam repudiandae nisi ipsam. Fugiat, ullam maxime, nulla repellat voluptatum voluptate totam esse ea, pariatur deleniti perferendis reiciendis velit impedit?</p>

      </div>

      {/* Card 3 */}
      <div className="flex flex-col items-center text-center max-w-[200px]">
        <img src={assets.support_img} alt="Support" className="w-10 h-10 mb-4" />
        <p className="text-lg font-semibold text-gray-800">Best Customer Support</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem odio nobis blanditiis, debitis laborum facere incidunt error at, vero praesentium tempora repellendus aliquam necessitatibus, minus non! Sed esse non perferendis.</p>
      </div>

    </div>
  )
}

export default Policy
