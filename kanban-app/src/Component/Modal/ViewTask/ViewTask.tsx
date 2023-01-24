import React, { useState, useEffect } from "react";
import Modal from "../../ReusableComponents/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Store";
import { useForm, useFieldArray } from "react-hook-form";
import { module, task } from "../../../Interface/Interface";
import { verticalellipsis } from "../../../Icons/Icon";
import "./viewtask.scss";
import { openModal } from "../../../Features/ModalSlice";
import { setBoardStatus } from "../../../Features/DataSlice";

function ViewTask(props: module) {
	const { moduleType, tasks } = props;
	const dispatch = useDispatch();
	const completed = tasks.subtasks.filter((x: any) => x.isCompleted === true);

	useEffect(() => {
		dispatch(setBoardStatus(tasks.status));
	}, []);

	console.log(tasks);

	return (
		<Modal>
			<div className="viewtask">
				<div className="viewtask_topwrapper">
					<h2>{tasks.title} </h2>

					<button
						onClick={() => {
							dispatch(openModal({ moduleType: "EditTask" }));
						}}
						className="edittask_btn"
					>
						{verticalellipsis}
					</button>
				</div>
				<p>{tasks.description ? tasks.description : "No description"}</p>
				<div className="viewtask_subtask">
					<span className="viewtask_title">
						Subtasks
						{`(${completed.length}  of ${tasks.subtasks.length})`}
					</span>
				</div>
			</div>
		</Modal>
	);
}

export default ViewTask;
