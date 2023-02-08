import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { module } from "../Interface/Interface";

const initialState: module = {
	moduleType: "",
	tasks: {},
	modalName: "",
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
		setModalName: (state, action: PayloadAction<any>) => {
			return { ...state, modalName: action.payload };
		},
	},
});

export const { openModal, closeModal, setModalName } = modalSlice.actions;
export default modalSlice.reducer;
