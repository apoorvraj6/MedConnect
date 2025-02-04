import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Footer() {
    return (
        <div className='md:mx-10 '>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* Left Section */}
                <div>
                    <img src={assets.logo} alt="" className='mb-5 w-40' />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio cupiditate debitis corporis ratione provident earum ut tempore officiis sint molestiae. Similique eligendi earum pariatur laudantium et.</p>
                </div>

                {/* Center Section */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Section */}

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91 343-353-6835</li>
                        <li>apoorvraj2003@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* Copyright Text */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyroght 2024@ MedConnect - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer
