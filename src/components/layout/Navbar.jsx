import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillAlt, FaUserAstronaut } from 'react-icons/fa';

function Navbar() {
  return (
    <div className='fixed w-full h-[80px] bottom-0'>
      <div className='bg-base-200 bg-opacity-75 backdrop-blur-lg h-full flex flex-row pt-2'>
        <Link to='/' className='mx-auto'>
          <FaMoneyBillAlt className='text-3xl mx-auto' />
          <p>Budget</p>
        </Link>

        <Link to='/profile' className='mx-auto'>
          <FaUserAstronaut className='text-3xl mx-auto' />
          <p>Profile</p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
