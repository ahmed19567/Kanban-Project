import { useState } from "react";
import { faChevronDown, faChevronUp } from "../../../Icons/Icon";
import { setCurrentStatus } from "../../../Features/DataSlice";
import "./select.scss";

interface SelectDropDownProps {
	status: [] | any;
	currentStatus?: string | "";
	SetCurrentStatus: (index: number) => void;
}

function SelectDropDown(props: SelectDropDownProps) {
	const { status, currentStatus, SetCurrentStatus } = props;
	const [openDropDown, setOpenDropDown] = useState(false);
	function toggleDropDown() {
		setOpenDropDown(!openDropDown);
	}

	return (
		<div className="selectDropDown" onClick={toggleDropDown}>
			<div className="selectDropDown_top_wrapper">
				<p>{currentStatus}</p>
				{openDropDown ? <i>{faChevronDown}</i> : <i>{faChevronUp}</i>}
			</div>
			<div className="selectDropDown_bottomwrapper">
				{openDropDown
					? status.map((item: any, index: number) => (
							<button
								className="choose_task"
								onChange={() => {
									setCurrentStatus(index);
								}}
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
