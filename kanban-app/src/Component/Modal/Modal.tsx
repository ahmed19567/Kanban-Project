import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import AddBoard from "./AddBoard/AddBoard";
import AddNewColumn from "./AddNewColumn/AddNewColumn";
import DeleteBoard from "./DeleteBoard/DeleteBoard";
function Modal() {
	const modal = useSelector((state: RootState) => state.modal.moduleType);
	return (
		<>
			{modal === "AddBoard" && <AddBoard />}
			{modal === "AddColumn" && <AddNewColumn />}
			{modal === "DeleteBoard" && <DeleteBoard />}
		</>
	);
}

export default Modal;
