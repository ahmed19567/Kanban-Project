import React, { useState } from "react";
import { faChevronDown, faChevronUp } from "../../../Icons/Icon";
import Button from "../Button/Button";

interface SelectDropDownProps {
	status: any;
	currentStatus?: string | "";
	onSetCurrentStatus?: (status: string) => void;
}

function SelectDropDown(props: SelectDropDownProps) {
	const [openDropDown, setOpenDropDown] = useState(false);
	function toggleDropDown() {
		setOpenDropDown(!openDropDown);
	}
	return (
		<div className="selectDropDown" onClick={toggleDropDown}>
			{openDropDown ? (
				<Button className="icon_btn">{faChevronDown}</Button>
			) : (
				<Button className="icon_btn">{faChevronUp}</Button>
			)}

			{props.status.map((val: any) => (
				<>
					<p>{val}</p>
				</>
			))}
		</div>
	);
}

export default SelectDropDown;
