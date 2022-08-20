import { useState } from 'react';
import { currencyFormatter } from '../shared/utils';

function BudgetItem({ budgetItem }) {
  return (
    <div className='mb-2'>
      {budgetItem?.map((item) => (
        <div key={item.uid}>
          <div className='flex justify-between'>
            <input
              className='input input-ghost input-sm text-lg px-0 max-w-[60%]'
              value={item.label}
            />
            <input
              className='text-end input input-ghost input-sm text-lg px-0 max-w-[40%]'
              value={currencyFormatter.format(item.amount)}
            />
          </div>
          <hr className='mb-2' />
        </div>
      ))}
    </div>
  );
}

export default BudgetItem;
