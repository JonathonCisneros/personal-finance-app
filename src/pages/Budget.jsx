import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import BudgetGroup from '../components/BudgetGroup';

function Budget() {
  const [group, setGroup] = useState([
    {
      id: '123',
      label: 'Income',
      amount: 5000,
    },
    {
      id: '124',
      label: 'Income',
      amount: 3000,
    },
    {
      id: '456',
      label: 'Savings',
      amount: 2000,
    },
    {
      id: '789',
      label: 'Debt 1',
      amount: 300,
    },
    {
      id: '101',
      label: 'Debt 2',
      amount: 1000,
    },

    {
      id: '102',
      label: 'Debt 3',
      amount: 100,
    },
  ]);

  // iPhone notch area color match
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#66cc8a');

  return (
    <>
      <div className='bg-base-200'>
        <div className='relative h-[100px]'>
          <header className='fixed top-0 w-full px-4 py-8 bg-primary z-50 shadow-sm'>
            <h1 className='text-base-100 text-3xl'>
              <span className='font-bold'>August</span> 2022
            </h1>
          </header>
        </div>

        <BudgetGroup group={group} />
      </div>

      <Navbar />
    </>
  );
}

export default Budget;
