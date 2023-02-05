import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { board } from "../Interface/Interface";
import { produce } from "immer";

export type boardSlice = {
	data: board[];
	status: string[];
	currentStatus: string;
	colorTheme: "dark" | "light";
};
const initialState: boardSlice = {
	data: [],
	status: [],
	currentStatus: "",
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

		getData: (state, action: PayloadAction<any>) => {
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
			const { board, status, oldTask, newTask, title } = action.payload;
			const datas = current(state.data);
			const boardIndex = datas.findIndex((x) => x.name === board);
			const oldColumnIndex = datas[boardIndex].columns.findIndex(
				(x) => x.name === oldTask.status
			);

			const newColumnIndex = datas[boardIndex].columns.findIndex(
				(x) => x.name === status
			);
			const taskIndex = datas[boardIndex].columns[
				oldColumnIndex
			].tasks.findIndex((v) => v.title === title);

			const newState = produce(datas, (draft: any) => {
				if (oldTask.status !== newTask.status) {
					draft[boardIndex].columns[oldColumnIndex].tasks.splice(taskIndex, 1);
					draft[boardIndex].columns[newColumnIndex].tasks.push(newTask);
				}
			});

			return { ...state, data: newState };
		},
		deleteTask: (state, action: PayloadAction<any>) => {
			const { board, status, title } = action.payload;
			const data = current(state.data);
			const boardIndex = data.findIndex((x) => x.name === board);
			const columnIndex = data[boardIndex].columns.findIndex(
				(x) => x.name === status
			);

			const taskIndex = data[boardIndex].columns[columnIndex].tasks.findIndex(
				(x) => x.title === title
			);

			const newState = produce(data, (draft) => {
				draft[boardIndex].columns[columnIndex].tasks.splice(columnIndex, 1);
			});
			return { ...state, data: newState };
		},
		addTask: (state, action: PayloadAction<any>) => {
			const { board, status, task } = action.payload;
			const datas = current(state.data);
			const boardIndex = datas.findIndex((x) => x.name === board);
			const columnIndex = datas[boardIndex].columns.findIndex(
				(x) => x.name === status
			);

			const newState = produce(datas, (draft: any) => {
				draft[boardIndex].columns[columnIndex].tasks.push(task);
			});
			return { ...state, data: newState };
		},
		setStatus: (state, action: PayloadAction<any>) => {
			const board = action.payload;
			const data = current(state.data);

			const boardIndex = data.findIndex((x) => x.name === board);
			const columnStatus = data[boardIndex].columns.map((x) => x.name);
			return { ...state, status: columnStatus };
		},
		setCurrentStatus: (state, action: PayloadAction<string>) => {
			return { ...state, currentStatus: action.payload };
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
	addTask,
	setTheme,
	setStatus,
	setCurrentStatus,
	deleteTask,
} = dataSlice.actions;
export default dataSlice.reducer;
