import { Product } from "../graphql/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CartState {
  productsInCart: Product[];
  total: number;
  isCartOpen: boolean;
}

const initialState: CartState = {
  productsInCart: [],
  total: 0,
  isCartOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const productInCart = state.productsInCart.find(
        (product) => product.id === action.payload.id
      );
      if (!productInCart) {
        state.productsInCart.push({ ...action.payload, quantity: 1 });
        state.total = calculateTotal(state.productsInCart);
      } else {
        productInCart.quantity++;
        state.total = calculateTotal(state.productsInCart);
      }
    },

    deleteItemFromCart: (state, action: PayloadAction<Product>) => {
      const productInCartIndex = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (state.productsInCart[productInCartIndex].quantity === 1) {
        state.productsInCart.splice(productInCartIndex, 1);
        state.total = calculateTotal(state.productsInCart);
      } else {
        state.productsInCart[productInCartIndex].quantity--;
        state.total = calculateTotal(state.productsInCart);
      }
    },

    toggleCartModal: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
  },
});

function calculateTotal(products: Product[]) {
  return products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
}

export const { addItemToCart, deleteItemFromCart, toggleCartModal } =
  cartSlice.actions;

export default cartSlice.reducer;
