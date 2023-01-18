import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import AddBoard from "./AddBoard/AddBoard";
function Modal() {
	const modal = useSelector((state: RootState) => state.modal.moduleType);
	return <>{modal === "AddBoard" ? <AddBoard /> : ""}</>;
}

export default Modal;
