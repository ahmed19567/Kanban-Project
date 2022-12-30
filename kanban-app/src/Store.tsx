import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./Features/ModalSlice";
import dataSlice from "./Features/DataSlice";

export const store = configureStore({
	reducer: {
		modal: modalSlice,
		data: dataSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
