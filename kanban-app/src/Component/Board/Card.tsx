import React from "react";
import { task } from "../../Interface/Interface";
function Card(props: task) {
	const completed = props.subtasks.filter((x) => x.isCompleted === true);
	return (
		<div className="card">
			<p className="task_title">{props.title} </p>
			<span>
				{completed.length} of {props.subtasks.length}
			</span>
			{/* <div className="card_title">{props.title}</div>
			<div className="card_task_completion"></div> */}
		</div>
	);
}

export default Card;
