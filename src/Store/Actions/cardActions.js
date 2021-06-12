export const addProductAction = product => ({
  type: 'ADD_PRODUCT',
  payload: product,
});
export const deleteCartItemAction = index => ({
  type: 'DELETE_CART_ITEM',
  payload: index,
});
export const clearCartAction = () => ({
  type: 'CLEAR_CART',
});
