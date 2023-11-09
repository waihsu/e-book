import React from 'react'

export default function Navbar() {
  return (
    <div>
        <div className='flex justify-between'>
            <h4>E-Book</h4>
            <ul className='flex gap-4'>
                <li>Home</li>
                <li>Free</li>
                <li>Premium</li> 
                <li>Account</li>
            </ul>
        </div>
    </div>
  )
}
