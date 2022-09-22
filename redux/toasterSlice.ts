import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/redux/store";

class Toast implements IToast {
  public msg: string;
  public createdAt: number;
  public type?: string;

  constructor(msg: string, type?: string) {
    this.msg = msg;
    if (type) {
      this.type = type;
    }
    this.createdAt = Date.now();
  }
}

export interface IToast {
  msg: string;
  createdAt?: number;
  type?: string;
}

export interface ToasterState {
  toasts: IToast[];
}

const initialState: ToasterState = {
  toasts: [],
};

export const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    setToast(state, action: PayloadAction<IToast | string>) {
      let toast: IToast;
      if (typeof action.payload === "string") {
        toast = new Toast(action.payload);
      } else {
        const type = action.payload.type ?? "";
        toast = new Toast(action.payload.msg, type);
      }
      state.toasts.push({
        msg: toast.msg,
        type: toast.type ?? "",
        createdAt: toast.createdAt,
      });
    },
    deleteToast(state, action: PayloadAction<number>) {
      state.toasts = state.toasts.filter((toast: IToast) => {
        return toast.createdAt !== action.payload; // filters all false
      });

      // state.toasts.splice(
      //   state.toasts.findIndex((item) => item.createdAt === action.payload),
      //   1
      // );
    },
  },
});

export const { setToast, deleteToast } = toasterSlice.actions;

export default toasterSlice.reducer;

export const errorToast = (msg: string, dispatch: AppDispatch) => {
  if (!msg) return;
  dispatch(setToast({ msg: msg, type: "error" }));
};

export const successToast = (msg: string, dispatch: AppDispatch) => {
  if (!msg) return;
  dispatch(setToast(msg));
};
