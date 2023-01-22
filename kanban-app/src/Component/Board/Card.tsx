import React from "react";
import { task } from "../../Interface/Interface";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../Features/ModalSlice";
import { RootState } from "../../Store";

function Card(props: task) {
	const completed = props.subtasks.filter((x) => x.isCompleted === true);
	const dis = useSelector((state: RootState) => state.modal.tasks);
	const dispatch = useDispatch();

	return (
		<div
			className="card"
			onClick={() =>
				dispatch(openModal({ moduleType: "ViewTask", tasks: { ...props } }))
			}
		>
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
