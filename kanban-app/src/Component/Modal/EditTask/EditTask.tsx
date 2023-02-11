import React, { useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { task, subtask } from "../../../Interface/Interface";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { closeModal } from "../../../Features/ModalSlice";
import { editTask } from "../../../Features/DataSlice";
import Modal from "../../ReusableComponents/Modal/Modal";
import { crossIcon } from "../../../Icons/Icon";
import { RootState } from "../../../Store";
import SelectDropDown from "../../ReusableComponents/Select/SelectDropDown";
import "./edittask.scss";

function EditTask(props: any) {
	const { theme } = props;
	const tasks = useSelector((state: RootState) => state.modal.tasks);
	const board = useSelector((state: RootState) => state.tabs);
	const boardStatus = useSelector((state: RootState) => state.data.status);
	const dispatch = useDispatch();
	const { id, title, description, status, subtasks } = tasks;
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		getValues,
		setValue,
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
	const getCurrentStatus = getValues("status");

	function addNewTask() {
		if (fields.length < 5) return append({ title: "", isCompleted: false });
		else return;
	}
	function changeStatus(value: string) {
		setValue("status", value, { shouldValidate: true });
	}

	function submit(data: any) {
		dispatch(editTask({ board, newTask: data, oldTask: tasks, status, title }));
		dispatch(closeModal());
	}

	return (
		<Modal>
			<form className={`edittask ${theme}`} onSubmit={handleSubmit(submit)}>
				<h2>Edit task</h2>
				<div className="edittask_wrapper">
					<p>Title</p>
					<label htmlFor="">
						<input type="text" value={title} />
					</label>
				</div>

				<div className="edittask_wrapper">
					<p>Description</p>
					<label htmlFor="">
						<textarea rows={3} {...register("description")} />
					</label>
				</div>
				<div className="edittask_wrapper">
					<p>Subtask</p>

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

					<div className="edittask_wrapper">
						<p>Status</p>
						<SelectDropDown
							currentStatus={
								getCurrentStatus ? getCurrentStatus : boardStatus[0]
							}
							status={boardStatus}
							onSetCurrentStatus={changeStatus}
						/>
					</div>

					<button type="submit" className="save_changed">
						Save Changes
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default EditTask;
