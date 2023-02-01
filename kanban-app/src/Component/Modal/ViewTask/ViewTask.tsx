import { useState } from "react";
import Modal from "../../ReusableComponents/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../ReusableComponents/Input/Input";
import { module } from "../../../Interface/Interface";
import SelectDropDown from "../../ReusableComponents/Select/SelectDropDown";
import { verticalellipsis } from "../../../Icons/Icon";
import "./viewtask.scss";
import { openModal } from "../../../Features/ModalSlice";
import { RootState } from "../../../Store";

function ViewTask(props: module) {
	const { tasks } = props;
	const boardStatus = useSelector((state: RootState) => state.data.status);
	const dispatch = useDispatch();
	const { id, title, description, status, subtasks } = tasks;

	const [value, setValue] = useState({
		id: id,
		title: title,
		description: description,
		status: status,
		subtasks: subtasks,
	});
	const completed = value.subtasks.filter((x: any) => x.isCompleted === true);

	const changeSubtaskCheck = (index: number) => {
		const subTask = tasks.subtasks;
		subTask[index] = {
			...subTask[index],
			isCompleted: !subTask[index].isCompleted,
		};
		setValue({ ...value, subtasks: subTask });
	};

	const changeStatus = () => {};

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
				<p className="description">
					{tasks.description ? tasks.description : "No description"}
				</p>
				<div className="viewtask_subtask">
					<span className="viewtask_title">
						Subtasks
						{`(${completed.length}  of ${tasks.subtasks.length})`}
					</span>
					{value.subtasks.map((x: any, index: number) => (
						<>
							<Input
								checked={x.isCompleted}
								task={x.title}
								changeStatus={() => {
									changeSubtaskCheck(index);
								}}
							/>
						</>
					))}
				</div>
				<div className="viewtask_current_status">
					<p className="viewtask_p">Current Status</p>
					<SelectDropDown
						status={boardStatus}
						currentStatus={status}
						SetCurrentStatus={changeStatus}
					/>
				</div>
			</div>
		</Modal>
	);
}

export default ViewTask;
