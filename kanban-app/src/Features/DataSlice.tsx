import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { board, task } from "../Interface/Interface";
import { column } from "../Interface/Interface";
import { produce } from "immer";

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
		},
		addBoard: (state, action: PayloadAction<any>) => {
			const newBoard = action.payload;
			const data = current(state.data);
			const newState = produce(data, (draft: any) => {
				draft.push(newBoard);
			});
			return { ...state, data: newState };
		},
		addColumn: (state, action: PayloadAction<any>) => {
			const { board, newColumn } = action.payload;
			const datas = current(state.data);
			const currentBoard = datas.find((val) => val.name === board);
			const newState = produce(datas, (draft: any) => {
				const currentDraft = current(draft);
				const currentIndex = datas.findIndex((x) => x.name === board);
				const updatedBoard = {
					...newColumn,
				};
				draft[currentIndex] = updatedBoard;
			});

			return { ...state, data: newState };
		},
		deleteBoard: (state, action: PayloadAction<any>) => {
			const { board } = action.payload;
			const datas = current(state.data);
			const currentBoard = datas.find((val) => val.name === board);

			const newState = produce(datas, (draft: any) => {
				const currentDraft = draft.filter((x: any) => x.name !== board);
				draft = currentDraft;
				return draft;
			});
			return { ...state, data: newState };
		},
	},
});
export const { addData, getData, getId, addBoard, addColumn, deleteBoard } =
	dataSlice.actions;
export default dataSlice.reducer;
