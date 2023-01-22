import React, { useState, ReactNode } from "react";
import "./dropdown.css";
type dropDownTypes = {
	children: ReactNode;
	className: string;
	onClick?: () => void;
	title?: string;
	onEdit: () => void;
	onDelete: () => void;
};

function DropDown(props: dropDownTypes) {
	const { onDelete, onEdit } = props;
	const [open, setOpen] = useState(false);
	function toggleDropDown() {
		setOpen(!open);
	}

	function remove() {
		onDelete();
		setOpen(false);
	}
	function edit() {
		onEdit();
		setOpen(false);
	}

	return (
		<div className="dropdown">
			<button onClick={toggleDropDown} className="dropdownbtn">
				{props.children}
			</button>
			{open && (
				<div className="dropdownmenu">
					<button className="dropdownmenu_btn" onClick={edit}>
						Edit {props.title}
					</button>
					<button className="dropdownmenu_btn" onClick={remove}>
						Delete {props.title}
					</button>
				</div>
			)}
		</div>
	);
}

export default DropDown;
