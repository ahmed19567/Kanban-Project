import React from "react";
import "./input.css";

type input = {
	task: string;
	checked: boolean;
};
function Input(props: input) {
	const { task, checked } = props;
	return (
		<label className="checkbox">
			<input
				type="checkbox"
				checked={checked}
				id="checkbox"
				className="checkbox_prototype"
			/>
			<p>{props.task}</p>
		</label>
	);
}

export default Input;
