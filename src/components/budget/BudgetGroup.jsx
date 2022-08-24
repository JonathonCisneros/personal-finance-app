import React, { useEffect, useState } from 'react';
import { currencyFormatter } from '../shared/utils';
import BudgetItem from './BudgetItem';

function BudgetGroup({ budgetGroups }) {
  const [incomeGroup, setIncomeGroup] = useState({});
  const [expenseGroups, setExpenseGroups] = useState([]);

  useEffect(() => {
    budgetGroups.map((budgetGroup) => {
      if (budgetGroup?.type === 'income') {
        setIncomeGroup(budgetGroup);
      } else if (budgetGroup?.type === 'expense') {
        setExpenseGroups((prevState) => [...prevState, budgetGroup]);
      }
    });
  }, [budgetGroups]);

  let monthlyIncome = 0;
  for (let i = 0; i < incomeGroup.budgetItems?.length; i++) {
    monthlyIncome += incomeGroup.budgetItems[i].amount;
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

        {/* Income group, cannot delete */}
        <div className='card bg-base-100 my-5 shadow-sm'>
          <div className='card-body p-4'>
            <h1 className='card-title text-sm justify-between mb-2 text-gray-500'>
              {incomeGroup.label}
              <span className='font-light text-sm'>Planned</span>
            </h1>
            <BudgetItem budgetItem={incomeGroup.budgetItems} />
          </div>
        </div>

        {/* Expense groups, can delete */}
        {expenseGroups?.map((expenseItem) => (
          <div
            className='card bg-base-100 my-5 shadow-sm'
            key={expenseItem.uid}
          >
            <div className='card-body p-4'>
              <h1 className='card-title text-sm justify-between mb-2 text-gray-500'>
                {expenseItem.label}
                <span className='font-light text-sm'>Planned</span>
              </h1>
              {expenseItem.budgetItems?.map((item, index) => (
                <BudgetItem item={item} key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BudgetGroup;
