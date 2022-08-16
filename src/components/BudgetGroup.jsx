import React from 'react';
import { currencyFormatter } from './utils';

function BudgetGroup({ group }) {
  // check if budget group is income
  const checkBudgetLabel = (budget) => {
    if (budget.label === 'Income') {
      return budget;
    }
  };
  const incomes = group.filter(checkBudgetLabel); // call function to find Income budget group
  const incomeAmountsArray = incomes.map((income) => {
    return income.amount;
  });
  let monthlyIncome = 0;
  for (let i = 0; i < incomeAmountsArray.length; i++) {
    monthlyIncome += incomeAmountsArray[i];
  }

  return (
    <>
      <div className='mx-2 py-4'>
        <div className='card flex-cols text-center py-5 bg-base-100 shadow-sm'>
          <h1 className='text-4xl font-bold'>
            {currencyFormatter.format(monthlyIncome)}
          </h1>
          <p className='text-md font-light'>Monthly Income</p>
        </div>

        {group.map((groupItem) => (
          <div className='card bg-base-100 my-5 shadow-sm' key={groupItem.id}>
            <div className='card-body'>
              <h1 className='card-title'>{groupItem.label}</h1>
              <p>{currencyFormatter.format(groupItem.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BudgetGroup;
