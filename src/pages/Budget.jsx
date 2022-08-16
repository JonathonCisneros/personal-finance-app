import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import BudgetGroup from '../components/budget/BudgetGroup';

function Budget() {
  const [budgetGroups, setBudgetGroups] = useState([
    {
      id: '123',
      budgetGroupLabel: 'Income',
      type: 'income',
      budgetItems: [
        {
          label: 'Company One',
          amount: 5000,
          type: 'income',
        },
        {
          label: 'Company Two',
          amount: 3000,
          type: 'income',
        },
      ],
    },
    {
      id: '456',
      budgetGroupLabel: 'Savings',
      type: 'expense',
      budgetItems: [
        {
          label: 'Emergency Fund',
          amount: 1000,
          type: 'expense',
        },
        {
          label: 'House Fund',
          amount: 500,
          type: 'expense',
        },
      ],
    },
    {
      id: '789',
      budgetGroupLabel: 'Investments',
      type: 'expense',
      budgetItems: [
        {
          label: '401k',
          amount: 1000,
          type: 'expense',
        },
        {
          label: 'Roth IRA',
          amount: 1000,
          type: 'expense',
        },
      ],
    },
    {
      id: '101',
      budgetGroupLabel: 'Housing',
      type: 'expense',
      budgetItems: [
        {
          label: 'Rent',
          amount: 2000,
          type: 'expense',
        },
        {
          label: 'Utilities',
          amount: 100,
          type: 'expense',
        },
      ],
    },

    {
      id: '102',
      budgetGroupLabel: 'Debt',
      type: 'expense',
      budgetItems: [
        {
          label: 'Car Loan',
          amount: 350,
          type: 'expense',
        },
        {
          label: 'Student Loan',
          amount: 200,
          type: 'expense',
        },
      ],
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

        <div className='max-w-[50rem] mx-auto'>
          <BudgetGroup budgetGroups={budgetGroups} />
        </div>
      </div>

      <Navbar />
    </>
  );
}

export default Budget;
