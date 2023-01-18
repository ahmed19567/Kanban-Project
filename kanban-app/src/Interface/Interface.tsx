export type modalTypes =
	| "ViewTask"
	| "AddBoard"
	| "AddNewTask"
	| "AddColumn"
	| "EditTask"
	| "EditBoard"
	| "DeleteBoard"
	| "DeleteTask"
	| "";

export interface task {
	id: string;
	title: string;
	description: string;
	status: string;
	subtasks: subtask[];
}
export interface module {
	moduleType: modalTypes;
}
export interface subtask {
	title: string;
	isCompleted: boolean;
}
export interface column {
	id: string;
	name: string;
	tasks: task[];
}

export interface board {
	id: string;
	name: string;
	columns: column[];
}
export interface tab {
	addNew?: boolean;
}

export interface columnProps {
	columnData: column;
}
