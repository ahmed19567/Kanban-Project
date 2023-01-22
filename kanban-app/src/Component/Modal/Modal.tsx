import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import AddBoard from "./AddBoard/AddBoard";
import AddNewColumn from "./AddNewColumn/AddNewColumn";
import DeleteBoard from "./DeleteBoard/DeleteBoard";
import ViewTask from "./ViewTask/ViewTask";
import EditTask from "./EditTask/EditTask";
function Modal() {
	const modal = useSelector((state: RootState) => state.modal);
	return (
		<>
			{modal.moduleType === "AddBoard" && <AddBoard />}
			{modal.moduleType === "AddColumn" && <AddNewColumn />}
			{modal.moduleType === "DeleteBoard" && <DeleteBoard />}
			{modal.moduleType === "ViewTask" && <ViewTask {...modal} />}
			{/* {modal.moduleType === "EditTask" && <EditTask />} */}
		</>
	);
}

export default Modal;
