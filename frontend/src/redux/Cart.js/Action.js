
// src/redux/actions.js

import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_ITEM_QUANTITY, CLEAR_CART } from './Types';

// Action to add item to cart
export const addItemToCart = (item) => ({
  type: ADD_ITEM_TO_CART,
  payload: item,
});

// Action to remove item from cart
export const removeItemFromCart = (productId) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: productId,
});

// Action to update item quantity in cart
export const updateItemQuantity = (productId, quantity) => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: { productId, quantity },
});

// Action to clear the cart
export const clearCart = () => ({
  type: CLEAR_CART,
});
