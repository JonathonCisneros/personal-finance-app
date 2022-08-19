import { createContext, useReducer } from 'react';
import budgetReducer from './BudgetReducer';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const initialState = {
    budgetGroups: [],
    budgetItems: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
