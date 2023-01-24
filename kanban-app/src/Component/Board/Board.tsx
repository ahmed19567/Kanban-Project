import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store";
import { column } from "../../Interface/Interface";
import { editTask } from "../../Features/DataSlice";
import { openModal } from "../../Features/ModalSlice";
import "./board.scss";
import Column from "./Column";

function Board() {
	const dispatch = useDispatch();
	const tab = useSelector((state: RootState) => state.tabs);
	const board = useSelector((state: RootState) => state.data.data);
	const modalType = useSelector((state: RootState) => state.modal.moduleType);

	const columnDatas = board.filter((x) => x.name === tab);
	const findCurrentData = board.find((x) => x.name === tab);

	const addColumn = () => {
		dispatch(openModal({ moduleType: "AddColumn" }));
	};

	return (
		<div className="board">
			{findCurrentData?.columns.map((columnData: column, index: number) => (
				<>
					<Column columnData={columnData} index={index} />
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
