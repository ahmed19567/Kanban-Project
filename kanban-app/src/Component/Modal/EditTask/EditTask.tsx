import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { task, subtask } from "../../../Interface/Interface";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { closeModal } from "../../../Features/ModalSlice";
import { editTask } from "../../../Features/DataSlice";
import Modal from "../../ReusableComponents/Modal/Modal";
import { RootState } from "../../../Store";
import "./edittask.css";

function EditTask() {
	const data = useSelector((state: RootState) => state.data.data);
	const tasks = useSelector((state: RootState) => state.modal.tasks);
	const board = useSelector((state: RootState) => state.tabs);
	const dispatch = useDispatch();
	const { id, title, description, status, subtasks } = tasks;
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<task>({
		defaultValues: {
			id: id,
			title: title,
			description: description,
			status: status,
			subtasks: subtasks.map((val: subtask) => ({
				title: val.title,
				isCompleted: val.isCompleted,
			})),
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: "subtasks",
		control,
	});

	function addNewTask() {
		if (fields.length < 5) return append({ title: "", isCompleted: false });
		else return;
	}
	function submit(data: any) {
		dispatch(editTask({ board, newTask: data, status, title }));
	}

	const colums = data.find((x) => x.name === board);

	return (
		<Modal>
			<form
				action=""
				className="edittask"
				onClick={handleSubmit((data) => submit(data))}
			>
				<h2>Edit task</h2>
				<div className="edittask_wrapper">
					<p>Title</p>
					<label htmlFor="">
						<input type="text" value={title} />
					</label>
				</div>
				<div className="edittask_wrapper">
					<p>Title</p>
					<label htmlFor="">
						<input type="text" value="NAME" />
					</label>
				</div>
				<div className="edittask_wrapper">
					{fields.map((value, index) => (
						<div className="addnewtaskprop">
							<input
								type="text"
								{...register(`subtasks.${index}.title`, {
									required: {
										value: true,
										message: "You need atleast one character",
									},
								})}
							/>
							{/* <button onClick={() => remove(index)}>X</button> */}
						</div>
					))}
					<button className="addnewtask" onClick={() => addNewTask()}>
						Add New Task
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default EditTask;
