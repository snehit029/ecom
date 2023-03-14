// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartTotalAmount: 0,
  cartTotalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item)=>item._id === action.payload._id);
      if(itemIndex >= 0){
        state.cartItems[itemIndex].cartQuantity += 1;
      }else {
        const tempProduct = {...action.payload, cartQuantity: 1};
        state.cartItems.push(tempProduct);

        toast.success(`${action.payload.title} added to the cart`)
      }
    },
    incrementQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;

        toast.success(`Item QTY Increased`);
      }
    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.success(`Item QTY Decreased`);
     } 
     else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );

        state.cartItems = nextCartItems;
        toast.success(`${action.payload.title} Removed From Cart`);

     }
       
    },
    removeItem: (state, action) => {
      state.cartItems.map((cartItem) => {
        if (cartItem._id === action.payload._id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item._id !== cartItem._id
          );

          state.cartItems = nextCartItems;
        }
                return state;

      });
      toast.success(`${action.payload.title} Removed From Cart`);

    },

    clearCart(state, action){
       state.cartItems = [];
       toast.success(`Cart Cleared`);

    },
  
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  getTotals
} = cartSlice.actions;

export const selectTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
