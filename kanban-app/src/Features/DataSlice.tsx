import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { board } from "../Interface/modal";

export type boardSlice = {
	data: board[];
	boardStatus: any;
	colorTheme: "light" | "dark";
};
const initialState: boardSlice = {
	data: [],
	boardStatus: "",
	colorTheme: "dark",
};

const dataSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		addData: (state, action: PayloadAction<any>) => {
			return { ...state, data: action.payload };
		},
		getData: (state, action) => {
			return { ...state, data: action.payload };
		},
	},
});
export const { addData, getData } = dataSlice.actions;
export default dataSlice.reducer;
