import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store";
import { column } from "../../Interface/Interface";
import "./board.css";
import Column from "./Column";

import "./board.css";
function Board() {
	const dispatch = useDispatch();
	const tab = useSelector((state: RootState) => state.tabs);
	const board = useSelector((state: RootState) => state.data.data);

	const columnDatas = board.filter((x) => x.name === tab);
	const findCurrentData = board.find((x) => x.name === tab);

	return (
		<div className="board">
			{findCurrentData?.columns.map((columnData: column) => (
				<>
					<Column columnData={columnData} />
				</>
			))}
		</div>
	);
}

export default Board;
