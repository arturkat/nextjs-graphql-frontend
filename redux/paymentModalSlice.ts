import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  isOpenMultiStepModal: false,
};

const paymentModalSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    togglePaymentModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenMultiStepModal = action.payload;
    },
  },
});

export const { togglePaymentModal } = paymentModalSlice.actions;
export default paymentModalSlice.reducer;
