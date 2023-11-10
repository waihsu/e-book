import React from 'react'

export default function Navbar() {
  return (
    <div>
        <div className='flex justify-between py-8 px-10 '>
            <h4 className='text-2xl font-semibold'>E-BOOK</h4>
            <ul className='flex gap-10'>
                <li>HOME</li>
                <li>FREE</li>
                <li>PREMIUM</li> 
                <li>ACCOUNT</li>
            </ul>
        </div>
    </div>
  )
}
