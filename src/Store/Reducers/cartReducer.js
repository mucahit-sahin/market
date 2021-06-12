function cartReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      let x = state.findIndex(product => product.key == action.payload.key);
      if (x == -1) {
        return [...state, {...action.payload, quantity: 1}];
      } else {
        state[x].quantity = state[x].quantity + 1;
        return state;
      }
    case 'DELETE_CART_ITEM':
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}
export default cartReducer;
