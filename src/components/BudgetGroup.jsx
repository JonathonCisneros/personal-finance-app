import React from 'react';
import { currencyFormatter } from './utils';

function BudgetGroup({ group }) {
  return (
    <div className='mx-2'>
      {group.map((groupItem) => (
        <div className='card bg-base-200 my-5' key={groupItem.id}>
          <div className='card-body'>
            <h1 className='card-title'>{groupItem.label}</h1>
            <p>{currencyFormatter.format(groupItem.amount)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BudgetGroup;
