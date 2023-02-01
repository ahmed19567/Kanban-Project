import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { task } from "../../../Interface/Interface";
import { useForm, useFieldArray } from "react-hook-form";
import Modal from "../../ReusableComponents/Modal/Modal";
import { addTask, setCurrentStatus } from "../../../Features/DataSlice";
import SelectDropDown from "../../ReusableComponents/Select/SelectDropDown";
import { crossIcon } from "../../../Icons/Icon";
import "./addtask.scss";
import { RootState } from "../../../Store";
import { closeModal } from "../../../Features/ModalSlice";
function AddNewTask() {
	const data = useSelector((state: RootState) => state.data.data);
	const boardData = useSelector((state: RootState) => state.data);
	const boardStatus = useSelector((state: RootState) => state.data.status);
	const status = useSelector((state: RootState) => state.data.status);
	const currentStatus = boardStatus[0];

	const board = useSelector((state: RootState) => state.tabs);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<task>({
		defaultValues: {
			id: nanoid(),
			title: "",
			description: "",
			status: currentStatus,
			subtasks: [{ title: "", isCompleted: false }],
		},
	});

	const currentBoard = data.filter((val) => val.name === board);

	const { fields, append, remove } = useFieldArray({
		name: "subtasks",
		control,
	});
	function addNewTask() {
		if (fields.length < 10) return append({ title: "", isCompleted: false });
		else return;
	}

	function submitForm(data: task) {
		dispatch(addTask({ board, status: currentStatus, task: data }));
		dispatch(closeModal());
	}

	const changeStatusName = (item: number) => {
		dispatch(setCurrentStatus(item));
	};
	return (
		<Modal>
			<form className="addnewtask" onSubmit={handleSubmit(submitForm)}>
				<h2>Add New Task</h2>
				<div className="addnewtask_wrapper">
					<p>Title</p>
					<label htmlFor="">
						<input type="text" {...register("title")} />
					</label>
				</div>
				<div className="addnewtask_wrapper">
					<p>Description</p>
					<label htmlFor="">
						<textarea {...register("description")} rows={5} />
					</label>
				</div>
				<div className="addnewtask_wrapper">
					<p>SubTasks</p>

					{fields.map((val, index) => (
						<div className="addnewtaskprop">
							<input type="text" {...register(`subtasks.${index}.title`)} />
							<button
								type="button"
								onClick={() => remove(index)}
								className="crossicon"
							>
								{crossIcon}
							</button>
						</div>
					))}
					{fields.length < 10 && (
						<button onClick={addNewTask} type="button" className="addtask_btn">
							Add New Task
						</button>
					)}
				</div>
				<div className="addnewtask_wrapper">
					<p>Status</p>
					<SelectDropDown
						status={status}
						currentStatus={currentStatus ? currentStatus : status[0]}
						SetCurrentStatus={changeStatusName}
					/>
				</div>
				<button type="submit" className="savetask_btn">
					Submit
				</button>
			</form>
		</Modal>
	);
}

export default AddNewTask;
