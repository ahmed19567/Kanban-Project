import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { task, subtask } from "../../../Interface/Interface";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { closeModal } from "../../../Features/ModalSlice";
import { editTask } from "../../../Features/DataSlice";
import Modal from "../../ReusableComponents/Modal/Modal";
import { crossIcon } from "../../../Icons/Icon";
import { RootState } from "../../../Store";
import "./edittask.scss";

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
	console.log(title);

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
					<p>Description</p>
					<label htmlFor="">
						<textarea rows={5} {...register("description")} />
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
							<button onClick={() => remove(index)} className="crossicon">
								{crossIcon}
							</button>
						</div>
					))}
					<button className="addnewtask_btn" onClick={() => addNewTask()}>
						Add New Task
					</button>

					<button
						className="save_changed"
						type="submit"
						onClick={() => dispatch(closeModal)}
					>
						Save Changes
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default EditTask;
