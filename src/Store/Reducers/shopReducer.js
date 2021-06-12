function shopReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_SHOP':
      return action.payload;
    default:
      return state;
  }
}
export default shopReducer;
