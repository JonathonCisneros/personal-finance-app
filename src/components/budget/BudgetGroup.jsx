import React from 'react';
import { currencyFormatter } from '../shared/utils';
import BudgetItem from './BudgetItem';

function BudgetGroup({ budgetGroups }) {
  let monthlyIncome = 0;
  const incomeGroup = budgetGroups[0].budgetItems;

  const incomes = incomeGroup.map((each) => {
    return each.amount;
  });

  for (let i = 0; i < incomes.length; i++) {
    monthlyIncome += incomes[i];
  }

  return (
    <>
      <div className='mx-4 py-4'>
        <div className='card flex-cols text-center py-5 bg-base-100 shadow-sm'>
          <h1 className='text-4xl font-bold'>
            {currencyFormatter.format(monthlyIncome)}
          </h1>
          <p className='text-md font-light'>Monthly Income</p>
        </div>

        {budgetGroups.map((budgetItem) => (
          <div className='card bg-base-100 my-5 shadow-sm' key={budgetItem.id}>
            <div className='card-body p-4'>
              <h1 className='card-title text-sm justify-between mb-2 text-gray-500'>
                {budgetItem.budgetGroupLabel}
                <span className='font-light text-sm'>Planned</span>
              </h1>
              <BudgetItem budgetItem={budgetItem.budgetItems} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BudgetGroup;
