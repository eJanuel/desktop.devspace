import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isDarkMode: boolean;
}

const initialState: AppState = {
  isDarkMode: false,
};

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode } = AppSlice.actions;

export default AppSlice.reducer;