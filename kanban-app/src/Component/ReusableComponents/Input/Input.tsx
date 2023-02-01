import React from "react";
import "./input.scss";

type input = {
	task: string;
	checked: boolean;
	changeStatus: () => void;
};
function Input(props: input) {
	const { task, checked, changeStatus } = props;

	return (
		<label className={`checkBox ${checked}`}>
			<input
				type="checkbox"
				checked={checked}
				onClick={changeStatus}
				id="checkbox"
				className="checkbox_prototype"
			/>
			{task}
		</label>
	);
}

export default Input;
