import { useState } from "react";
import { faChevronDown, faChevronUp } from "../../../Icons/Icon";
import "./select.scss";

interface SelectDropDownProps {
	status: [] | any;
	currentStatus?: string | "";
	onSetCurrentStatus: (item: string) => void;
}

function SelectDropDown(props: SelectDropDownProps) {
	const { status, currentStatus, onSetCurrentStatus } = props;
	const [openDropDown, setOpenDropDown] = useState(false);
	function toggleDropDown() {
		setOpenDropDown(!openDropDown);
	}

	return (
		<div className="selectDropDown" onClick={toggleDropDown}>
			<div className="selectDropDown_top_wrapper">
				<p>{currentStatus} </p>
				{openDropDown ? <i>{faChevronDown}</i> : <i>{faChevronUp}</i>}
			</div>
			<div className="selectDropDown_bottomwrapper">
				{openDropDown
					? status.map((item: any, index: number) => (
							<button
								className="choose_task"
								onClick={() => onSetCurrentStatus(item)}
							>
								<p>{item}</p>
							</button>
					  ))
					: ""}
			</div>
		</div>
	);
}

export default SelectDropDown;
