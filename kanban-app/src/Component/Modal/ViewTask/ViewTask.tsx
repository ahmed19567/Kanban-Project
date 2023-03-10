import { useEffect, useState } from "react";
import Modal from "../../ReusableComponents/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../ReusableComponents/Input/Input";
import { module } from "../../../Interface/Interface";
import SelectDropDown from "../../ReusableComponents/Select/SelectDropDown";
import { verticalellipsis } from "../../../Icons/Icon";
import { closeModal, openModal } from "../../../Features/ModalSlice";
import { RootState } from "../../../Store";
import { editTask, deleteTask } from "../../../Features/DataSlice";
import "./viewtask.scss";

import DropDown from "../../ReusableComponents/DropDown/DropDown";

function ViewTask(props: module) {
	const { tasks } = props;
	const boardStatus = useSelector((state: RootState) => state.data.status);
	const boardName = useSelector((state: RootState) => state.tabs);
	const theme = useSelector((state: RootState) => state.data.colorTheme);
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
		const subTask = value.subtasks.slice();
		subTask[index] = {
			...subTask[index],
			isCompleted: !subTask[index].isCompleted,
		};
		setValue({ ...value, subtasks: subTask });
	};

	const changeStatus = (item: string) => {
		setValue({ ...value, status: item });
		dispatch(
			editTask({
				board: boardName,
				status: value.status,
				title: value.title,
				newTask: value,
			})
		);
	};
	useEffect(() => {
		dispatch(
			editTask({
				board: boardName,
				status: value.status,
				title: value.title,
				newTask: value,
				oldTask: tasks,
			})
		);
	}, [value.status]);
	useEffect(() => {
		dispatch(
			editTask({
				board: boardName,
				status: value.status,
				title: value.title,
				newTask: value,
				oldTask: tasks,
			})
		);
	}, [value.subtasks]);

	function handleEdit() {
		dispatch(openModal({ moduleType: "EditTask" }));
	}
	function onDelete() {
		dispatch(deleteTask({ board: boardName, status, title }));
		dispatch(closeModal());
	}

	return (
		<Modal>
			<div className={`viewtask ${theme}`}>
				<div className="viewtask_topwrapper">
					<h2>{tasks.title} </h2>

					<DropDown
						className="edittask_btn"
						title="Task"
						onEdit={handleEdit}
						onDelete={onDelete}
						theme={theme}
					>
						{verticalellipsis}
					</DropDown>
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
								index={index}
								changeStatus={changeSubtaskCheck}
							/>
						</>
					))}
				</div>
				<div className="viewtask_current_status">
					<p className="viewtask_p">Current Status</p>
					<SelectDropDown
						status={boardStatus}
						currentStatus={value.status ? value.status : boardStatus[0]}
						onSetCurrentStatus={changeStatus}
						theme={theme}
					/>
				</div>
			</div>
		</Modal>
	);
}

export default ViewTask;
