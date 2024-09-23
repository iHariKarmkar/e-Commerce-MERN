import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img src={assets.logo} alt="" className='mb-5 w-32' />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iure corporis corrupti, ab repellendus eum hic a doloribus ipsa vitae, inventore animi laudantium! Non, quo.
                </p>
            </div>

            <div>
                <p className='uppercase text-xl font-medium mb-5'>company</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5 uppercase'>get in touch</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 9876543210</li>
                    <li>contact@elegance.com</li>
                </ul>
            </div>

        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024 @ elegance.com - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer