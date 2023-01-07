import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { board } from "../Interface/Interface";

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
		getId: (state, action: PayloadAction<any>) => {
			const hold = state.data.find((x) => x.name === action.payload);
			console.log(current(hold));
		},
		addBoard: (state, action: PayloadAction<any>) => {},
	},
});
export const { addData, getData, getId, addBoard } = dataSlice.actions;
export default dataSlice.reducer;
