import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { board, task } from "../Interface/Interface";
import { column } from "../Interface/Interface";
import { produce } from "immer";
import { stat } from "fs";

export type boardSlice = {
	data: board[];
	status: "";
	colorTheme: "dark" | "light";
};
const initialState: boardSlice = {
	data: [],
	status: "",
	colorTheme: "dark",
};

const dataSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		addData: (state, action: PayloadAction<any>) => {
			return { ...state, data: action.payload };
		},
		setTheme: (state, action: PayloadAction<any>) => {
			return { ...state, colorTheme: action.payload };
		},
		setBoardStatus: (state, action: PayloadAction<any>) => {
			return { ...state, status: action.payload };
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
			const datas = current(state.data);
			const currentBoard = datas.find((x) => x.name === board);
			const boardIndex = datas.findIndex((x) => x.name === board);

			const columnIndex = datas[boardIndex].columns.findIndex(
				(x) => x.name === status
			);
			const taskIndex = datas[boardIndex].columns[columnIndex].tasks.findIndex(
				(v) => v.title === title
			);
			const newState = produce(datas, (draft) => {
				draft[boardIndex].columns[columnIndex].tasks[taskIndex] = newTask;
			});
			return { ...state, data: newState };
		},
		deleteTask: (state, action: PayloadAction<any>) => {
			const { board, status, newTask, title } = action.payload;
			const data = current(state.data);
			const currentBoard = data.find((x) => x.name === board);
			const boardIndex = data.findIndex((x) => x.name === board);

			const newState = produce(data, (draft) => {});
			// return {...state, data:newState}
		},
		addTask: (state, action: PayloadAction<any>) => {
			const { board, status, task } = action.payload;
			const data = current(state.data);
			const boardIndex = data.findIndex((x) => x.name === board);
			const columnIndex = data[boardIndex].columns.findIndex(
				(x) => x.name === status
			);

			const newState = produce(data, (draft: any) => {
				draft[boardIndex].columns[columnIndex].tasks.push(task);
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
	setBoardStatus,
	addTask,
	setTheme,
} = dataSlice.actions;
export default dataSlice.reducer;
