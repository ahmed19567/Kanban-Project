import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./Features/ModalSlice";
import dataSlice from "./Features/DataSlice";
import tabSlice from "./Features/TabSlice";
import sideBarSlice from "./Features/SideBarSlice";
import { loadState } from "./Features/Browser-Storage";

export const store = configureStore({
	reducer: {
		modal: modalSlice,
		data: dataSlice,
		tabs: tabSlice,
		sideBar: sideBarSlice,
	},
	preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
