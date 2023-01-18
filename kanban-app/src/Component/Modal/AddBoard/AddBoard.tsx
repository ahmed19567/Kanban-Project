import React, { FormEvent, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { board } from "../../../Interface/Interface";
import { column } from "../../../Interface/Interface";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { RootState } from "../../../Store";
import { addBoard } from "../../../Features/DataSlice";
import { FormProvider } from "react-hook-form";
import { setTab } from "../../../Features/TabSlice";
import { closeModal } from "../../../Features/ModalSlice";
import Modal from "../../ReusableComponents/Modal/Modal";
import "./addboard.css";

function AddBoard() {
	const data = useSelector((state: RootState) => state.data.data);
	const disPatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<board>({
		defaultValues: {
			id: nanoid(),
			name: "",
			columns: [{ id: nanoid(), name: "", tasks: [] }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: "columns",
		control,
	});

	function addNewColumn() {
		if (fields.length < 3) return append({ id: nanoid(), name: "", tasks: [] });
		else return;
	}

	function submitBoard(data: board) {
		disPatch(addBoard(data));
		disPatch(setTab(data.name));
		disPatch(closeModal());
	}
	return (
		<Modal>
			<form
				action=""
				className="addnewboardform"
				onSubmit={handleSubmit(submitBoard)}
			>
				<div className="addnewboard_container">
					<div className="addnewboard_topwrapper">
						<h2>Add New Board</h2>
					</div>

					<div className="board_boxwrapper">
						<label htmlFor="name">Name</label>
						<input
							{...register("name", {
								required: {
									value: true,
									message: "You need atleast one character",
								},
							})}
							id="name"
						/>
					</div>
					{/* part 2 */}
					<div className="board_boxwrapper">
						<label htmlFor="columns">Columns</label>

						{fields.map((value, index) => (
							<div className="addnewcolumnprop">
								<input
									type="text"
									{...register(`columns.${index}.name`, {
										required: {
											value: true,
											message: "You need atleast one character",
										},
									})}
									defaultValue={`${value}`}
									id="columns"
								/>
								<button onClick={() => remove(index)}>X</button>
							</div>
						))}
					</div>

					{/* part 3 */}
					<button onClick={addNewColumn} className="addnewcolumnbtn">
						{" "}
						+ Add New Column
					</button>
					<button type="submit" className="createnewboardbtn">
						Create New Board
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default AddBoard;
