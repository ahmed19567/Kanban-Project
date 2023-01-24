import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { task } from "../../../Interface/Interface";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Modal from "../../ReusableComponents/Modal/Modal";
import { addTask } from "../../../Features/DataSlice";
import SelectDropDown from "../../ReusableComponents/Select/SelectDropDown";
import { crossIcon } from "../../../Icons/Icon";
import "./addtask.scss";
import { RootState } from "../../../Store";
function AddNewTask() {
	const data = useSelector((state: RootState) => state.data.data);
	const boardStatus = useSelector((state: RootState) => state.data.status);
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
			status: "",
			subtasks: [{ title: "", isCompleted: false }],
		},
	});

	const currentBoard = data.filter((val) => val.name === board);
	const task = currentBoard.map((val) => val.columns.map((x) => x.name));

	const { fields, append, remove } = useFieldArray({
		name: "subtasks",
		control,
	});
	function addNewTask() {
		if (fields.length < 5) return append({ title: "", isCompleted: false });
		else return;
	}

	return (
		<Modal>
			<form
				className="addnewtask"
				onSubmit={handleSubmit((data) => {
					dispatch(addTask({ board, status: boardStatus, task: data }));
				})}
			>
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
					{fields.length < 5 && (
						<button onClick={addNewTask} type="button" className="addtask_btn">
							Add New Task
						</button>
					)}
				</div>
				<div className="addnewtask_wrapper">
					<p>Status</p>
					<label htmlFor="">
						<input {...register("status")} />
					</label>
				</div>
				<button type="submit" className="savetask_btn">
					Submit
				</button>

				{/* <SelectDropDown status={task} /> */}
			</form>
		</Modal>
	);
}

export default AddNewTask;
