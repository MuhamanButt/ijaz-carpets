// src/redux/cartReducer.js

import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, UPDATE_ITEM_QUANTITY, CLEAR_CART } from './Types';

const initialState = {
  items: [],  // Array to hold cart items
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product_id === newItem.product_id);

      if (existingItemIndex !== -1) 
      {
        // Item already exists in the cart, update its quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], quantity: newItem.quantity };
        return { ...state, items: updatedItems };
      } 
      else {
        // Item is not in the cart, add it
        return { ...state, items: [...state.items, newItem], };
      }

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.product_id !== action.payload),
      };

    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.product_id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      console.log(state);
      return state;
  }
};

export default cartReducer;
