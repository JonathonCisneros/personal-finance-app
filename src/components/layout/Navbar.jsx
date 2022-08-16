import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillAlt, FaUserAstronaut } from 'react-icons/fa';

function Navbar() {
  return (
    <div className='relative h-[80px] bg-base-200'>
      <div className='fixed w-full h-[80px] bottom-0'>
        <div className='bg-opacity-75 backdrop-blur-lg h-full flex flex-row pt-2'>
          <Link to='/' className='mx-auto text-gray-500'>
            <FaMoneyBillAlt className='text-3xl mx-auto' />
            <p>Budget</p>
          </Link>

          <Link to='/profile' className='mx-auto text-gray-500'>
            <FaUserAstronaut className='text-3xl mx-auto' />
            <p>Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
