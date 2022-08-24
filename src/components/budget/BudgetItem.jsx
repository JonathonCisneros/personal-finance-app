import { useState } from 'react';
import { currencyFormatter } from '../shared/utils';

function BudgetItem({ budgetItem }) {
  const onChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className='mb-2'>
      {budgetItem?.map((item) => (
        <div key={item.id}>
          <div className='flex justify-between'>
            <input
              className='input input-ghost input-sm text-lg px-0 max-w-[60%]'
              defaultValue={item.label}
              onChange={onChange}
            />
            <input
              className='text-end input input-ghost input-sm text-lg px-0 max-w-[40%]'
              type='tel'
              defaultValue={currencyFormatter.format(item.amount)}
              onChange={onChange}
            />
          </div>
          <hr className='mb-2' />
        </div>
      ))}
    </div>
  );
}

export default BudgetItem;
