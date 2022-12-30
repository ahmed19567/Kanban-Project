import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { module } from "../Interface/modal";

const initialState: module = {
	moduleType: "",
	moduleDescription: {},
};
const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModule: (state, action: PayloadAction<module>) => {
			return { ...state, ...action.payload };
		},
		closeModule: (state, action: PayloadAction<module>) => {
			return {
				...state,
				moduleType: "",
			};
		},
	},
});

export const { openModule, closeModule } = modalSlice.actions;
export default modalSlice.reducer;
