import React from "react";

type input = {
	task?: string;
	type: string;
	isCompleted: boolean;
	index: number;
	onchange: (id: number) => void;
};
function Input(props: input) {
	return (
		<label className={`checkbox ${props.isCompleted ? "checkbox_true" : ""}`}>
			<input
				type={props.type}
				onChange={() => {
					props.onchange(props.index);
				}}
			/>
			{props.task}
		</label>
	);
}

export default Input;
