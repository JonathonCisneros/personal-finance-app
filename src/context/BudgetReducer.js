const budgetReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BUDGET_GROUPS':
      return {
        ...state,
        budgetGroups: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default budgetReducer;
