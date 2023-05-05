import { configureStore } from "@reduxjs/toolkit";
import { AppSlice } from "./app.slice";
import { AuthSlice } from "./features/auth/auth.slice";

export const store = configureStore({
    reducer: {
        app: AppSlice.reducer,
        auth: AuthSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;