import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">

                {/* Logo + About */}
                <div>
                    <img src={assets.logo} alt="Logo" className="w-32 mb-4" />
                    <p className="text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore molestiae
                        architecto doloremque necessitatibus sunt eos cumque vel cum porro ad voluptatibus.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li className="hover:text-white cursor-pointer">Home</li>
                        <li className="hover:text-white cursor-pointer">Contact</li>
                        <li className="hover:text-white cursor-pointer">About Us</li>
                        <li className="hover:text-white cursor-pointer">Our Policy</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
                    <ul className="space-y-2">
                        <li>+1-212-456-7890</li>
                        <li>greatstackdev@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} GreatStack. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
