import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

export const tabSlice = createSlice({
	name: "boardtab",
	initialState,
	reducers: {
		setTab: (state, action: PayloadAction<string>) => {
			return action.payload;
		},
	},
});
export const { setTab } = tabSlice.actions;

export default tabSlice.reducer;
