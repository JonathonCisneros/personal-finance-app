import React from 'react';
import Navbar from '../components/layout/Navbar';

function Budget() {
  // iPhone notch area color match
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#66cc8a');

  return (
    <>
      <main className='my-[150px]'>
        <header className='fixed top-0 w-full px-4 py-8 bg-primary z-50'>
          <h1 className='text-base-100 text-3xl'>
            <span className='font-bold'>August</span> 2022
          </h1>
        </header>
      </main>

      <Navbar />
    </>
  );
}

export default Budget;
