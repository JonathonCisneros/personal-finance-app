import React from 'react';
import Navbar from '../components/layout/Navbar';

function Budget() {
  // iPhone notch area color match
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#4c6bfb');

  return (
    <>
      <main className='my-[150px]'>
        <header className='fixed top-0 w-full px-4 py-8 bg-primary z-50'>
          <h1 className='text-base-100 text-3xl'>August 2022</h1>
        </header>

        <div class='card w-96 bg-base-100 shadow-xl'>
          <figure>
            <img src='https://placeimg.com/400/225/arch' alt='Shoes' />
          </figure>
          <div class='card-body'>
            <h2 class='card-title'>Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class='card-actions justify-end'>
              <button class='btn btn-primary'>Buy Now</button>
            </div>
          </div>
        </div>
        <div class='card w-96 bg-base-100 shadow-xl'>
          <figure>
            <img src='https://placeimg.com/400/225/arch' alt='Shoes' />
          </figure>
          <div class='card-body'>
            <h2 class='card-title'>Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class='card-actions justify-end'>
              <button class='btn btn-primary'>Buy Now</button>
            </div>
          </div>
        </div>
        <div class='card w-96 bg-base-100 shadow-xl'>
          <figure>
            <img src='https://placeimg.com/400/225/arch' alt='Shoes' />
          </figure>
          <div class='card-body'>
            <h2 class='card-title'>Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class='card-actions justify-end'>
              <button class='btn btn-primary'>Buy Now</button>
            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </>
  );
}

export default Budget;
