import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { module } from "../Interface/Interface";

const initialState: module = {
	moduleType: "",
};
const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<any>) => {
			return { ...state, moduleType: action.payload };
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
