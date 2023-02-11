import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import AddBoard from "./AddBoard/AddBoard";
import AddNewColumn from "./AddNewColumn/AddNewColumn";
import DeleteBoard from "./DeleteBoard/DeleteBoard";
import ViewTask from "./ViewTask/ViewTask";
import EditTask from "./EditTask/EditTask";
import AddNewTask from "./AddNewTask/AddNewTask";
function Modal() {
	const modal = useSelector((state: RootState) => state.modal);
	const theme = useSelector((state: RootState) => state.data.colorTheme);

	return (
		<>
			{modal.moduleType === "AddBoard" && <AddBoard theme={theme} />}
			{modal.moduleType === "AddColumn" && <AddNewColumn theme={theme} />}
			{modal.moduleType === "DeleteBoard" && <DeleteBoard theme={theme} />}
			{modal.moduleType === "ViewTask" && <ViewTask {...modal} />}
			{modal.moduleType === "EditTask" && <EditTask theme={theme} />}
			{modal.moduleType === "AddNewTask" && <AddNewTask theme={theme} />}
		</>
	);
}

export default Modal;
