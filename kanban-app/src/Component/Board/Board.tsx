import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store";
import { column } from "../../Interface/Interface";
import { editTask } from "../../Features/DataSlice";
import { openModal } from "../../Features/ModalSlice";
import "./board.scss";
import Column from "./Column";
import { useEffect } from "react";

function Board() {
	const dispatch = useDispatch();
	const tab = useSelector((state: RootState) => state.tabs);
	const data = useSelector((state: RootState) => state.data.data);
	const theme = useSelector((state: RootState) => state.data.colorTheme);
	const board = useSelector((state: RootState) => state.tabs);
	const modalType = useSelector((state: RootState) => state.modal.moduleType);

	const columnDatas = data.filter((x) => x.name === tab);
	const findCurrentData = data.find((x) => x.name === tab);

	const addColumn = () => {
		dispatch(openModal({ moduleType: "AddColumn" }));
	};

	return (
		<div className={`board ${theme}`}>
			{findCurrentData?.columns.map((columnData: column, index: number) => (
				<>
					<Column columnData={columnData} index={index} key={columnData.name} />
				</>
			))}
			<div
				className="colum_add_button"
				onClick={() => {
					addColumn();
				}}
			>
				+ New Column
			</div>
		</div>
	);
}

export default Board;
