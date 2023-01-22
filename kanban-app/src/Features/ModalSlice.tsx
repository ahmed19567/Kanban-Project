import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { module } from "../Interface/Interface";

const initialState: module = {
	moduleType: "",
	tasks: {},
};
const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<module>) => {
			return { ...state, ...action.payload };
		},
		closeModal: (state) => {
			return {
				...state,
				moduleType: "",
			};
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
