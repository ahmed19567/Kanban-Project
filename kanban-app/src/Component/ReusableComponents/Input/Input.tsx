import React from "react";
import "./input.scss";

type input = {
	task: string;
	checked: boolean;
	index: number;
	changeStatus: (index: number) => void;
};
function Input(props: input) {
	const { task, index, checked, changeStatus } = props;

	return (
		<label className={`checkBox ${checked}`}>
			<input
				type="checkbox"
				checked={checked}
				onClick={() => {
					changeStatus(index);
				}}
				id="checkbox"
				className="checkbox_prototype"
			/>
			{task}
		</label>
	);
}

export default Input;
