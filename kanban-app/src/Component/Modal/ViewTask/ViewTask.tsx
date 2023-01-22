import React, { useState } from "react";
import Modal from "../../ReusableComponents/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Store";
import { useForm, useFieldArray } from "react-hook-form";
import { module, task } from "../../../Interface/Interface";
import { verticalellipsis } from "../../../Icons/Icon";
import "./viewtask.css";

// id?: string;
// title?: string;
// description?: string;
// status: string;
// subtasks: subtask[];
function ViewTask(props: module) {
	const { moduleType, tasks } = props;
	const dispatch = useDispatch();
	const completed = tasks.subtasks.filter((x: any) => x.isCompleted === true);

	return (
		<Modal>
			<div className="viewtask">
				<div className="viewtask_topwrapper">
					<p>{tasks.title} </p>
					<div>{verticalellipsis}</div>
				</div>
				<p>{tasks.description ? tasks.description : "No description"}</p>
				<div className="viewtask_subtask">
					<p className="viewtask_title">
						Subtasks
						{`(${completed.length}  of ${tasks.subtasks.length})`}
					</p>
				</div>
			</div>
		</Modal>
	);
}

export default ViewTask;
