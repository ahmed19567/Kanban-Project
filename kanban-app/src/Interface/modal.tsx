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
	desciption: string;
	status: string;
}
export interface module {
	moduleType: modalTypes;
	moduleDescription: {};
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
