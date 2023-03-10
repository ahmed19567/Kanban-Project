import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Store";
import { useForm, useFieldArray } from "react-hook-form";
import { board, column } from "../../../Interface/Interface";
import { addColumn } from "../../../Features/DataSlice";
import { crossIcon } from "../../../Icons/Icon";

import "./column.scss";

import Modal from "../../ReusableComponents/Modal/Modal";
import { closeModal } from "../../../Features/ModalSlice";
function AddNewColumn(props: any) {
	const data = useSelector((state: RootState) => state.data.data);
	const boardValue = useSelector((state: RootState) => state.tabs);
	const findData = data.find((x) => x.name === boardValue);
	const dispatch = useDispatch();
	const { theme } = props;
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<board>({
		defaultValues: {
			name: boardValue,
			id: boardValue,
			columns: findData?.columns.map((val: column) => ({
				id: val.id,
				name: val.name,
				tasks: val.tasks,
			})),
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: "columns",
		control,
	});
	const addNewColumn = () => {
		if (fields.length < 10)
			return append({ id: nanoid(), name: "", tasks: [] });
		else return;
	};

	function submitData(data: board) {
		dispatch(addColumn({ board: boardValue, newColumn: data }));
		dispatch(closeModal());
	}

	return (
		<Modal>
			<form
				className={`addnewcolumn_container ${theme}`}
				onSubmit={handleSubmit(submitData)}
			>
				<h2>Add New Column</h2>
				<div className="addnewcolumn_div">
					<label htmlFor="name">
						<p>Name</p>
						<input
							{...register("name")}
							disabled={true}
							className="column_name"
						/>
					</label>

					{fields.map((x, index) => (
						<div className="status_column">
							<input
								type="text"
								{...register(`columns.${index}.name`)}
								className="column_name"
							/>
							<div className="" onClick={() => remove(index)}>
								{crossIcon}
							</div>
						</div>
					))}

					<button type="button" className="addnewcolumn" onClick={addNewColumn}>
						+ Add New Column
					</button>
					<button className="savechanges">Save Changes</button>
				</div>
			</form>
		</Modal>
	);
}

export default AddNewColumn;
