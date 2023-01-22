import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { board, task } from "../Interface/Interface";
import { column } from "../Interface/Interface";
import { produce } from "immer";
import { stat } from "fs";

export type boardSlice = {
	data: board[];
	boardStatus: string;
	columnStatus: string;
	colorTheme: "light" | "dark";
};
const initialState: boardSlice = {
	data: [],
	boardStatus: "",
	columnStatus: "",
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
		editTask: (state, action: PayloadAction<any>) => {
			const { board, status, newTask, title } = action.payload;
			const data = current(state.data);
			const currentBoard = data.find((x) => x.name === board);
			const boardIndex = data.findIndex((x) => x.name === board);

			const columnIndex = data[boardIndex].columns.findIndex(
				(x) => x.name === status
			);
			const taskIndex = data[boardIndex].columns[columnIndex].tasks.findIndex(
				(v) => v.title === title
			);
			const newState = produce(data, (draft) => {
				draft[boardIndex].columns[columnIndex].tasks[taskIndex] = newTask;
			});
			return { ...state, data: newState };
		},
	},
});
export const {
	addData,
	getData,
	getId,
	addBoard,
	addColumn,
	deleteBoard,
	editTask,
} = dataSlice.actions;
export default dataSlice.reducer;
