import React from "react";
import { assets } from "../assets/assets";// 👈 replace with your actual image

const About = () => {
  return (
    <div className="min-h-screen px-4 md:px-16 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Grid layout */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Text */}
          <div>
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Welcome to our store! We are passionate about providing
              high-quality products that meet your needs and exceed your
              expectations. Our goal is to create a seamless shopping experience
              with a focus on customer satisfaction.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To deliver top-quality products with exceptional service,
                  while making online shopping simple, enjoyable, and reliable
                  for everyone.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  To be a trusted e-commerce platform that connects people with
                  the products they love, fostering convenience and trust in
                  every transaction.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={assets.about_img}
              alt="About Us"
              className="rounded-lg shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center mb-6">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-3"></div>
              <h4 className="font-semibold">Alex Johnson</h4>
              <p className="text-gray-500 text-sm">Founder & CEO</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-3"></div>
              <h4 className="font-semibold">Maria Smith</h4>
              <p className="text-gray-500 text-sm">Head of Marketing</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-3"></div>
              <h4 className="font-semibold">Daniel Lee</h4>
              <p className="text-gray-500 text-sm">Product Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
