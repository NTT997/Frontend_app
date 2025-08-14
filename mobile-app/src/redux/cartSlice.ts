import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import {
  getCartCode,
  saveCartCode,
  clearCartCodeStorage,
} from "@/utils/cartStorage";

interface CartState {
  code: string | null;
}

const initialState: CartState = {
  code: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCode(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },
    clearCartCode(state) {
      state.code = null;
    },
  },
});

export const { setCartCode, clearCartCode } = cartSlice.actions;

export const loadCartCodeFromStorage = () => async (dispatch: AppDispatch) => {
  try {
    const code = await getCartCode();
    if (code) {
      dispatch(setCartCode(code));
    }
  } catch (error) {
    console.warn("[CartSlice] Failed to load cart code", error);
  }
};

// Optional: sync storage when Redux state changes
export const syncCartCodeStorage = (code: string | null) => {
  if (code) return saveCartCode(code);
  return clearCartCodeStorage();
};

export default cartSlice.reducer;
