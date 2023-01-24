import React, { Children, ReactNode, useEffect } from "react";
import { JsxElement } from "typescript";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../Features/ModalSlice";
import "./modal.scss";
interface modal {
	children: ReactNode;
}

function Modal(props: modal) {
	const dispatch = useDispatch();

	useEffect(() => {
		const handleCloseModal = (e: KeyboardEvent) => {
			if (e.code === "Escape") {
				dispatch(closeModal());
			}
		};
		document.addEventListener("keydown", handleCloseModal);
		return () => document.removeEventListener("keydown", handleCloseModal);
	}, []);

	return (
		<div className="overlay" onClick={() => dispatch(closeModal())}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<button
					className="Modal--close"
					onClick={() => dispatch(closeModal())}
				></button>
				{props.children}
			</div>
		</div>
	);
}

export default Modal;
