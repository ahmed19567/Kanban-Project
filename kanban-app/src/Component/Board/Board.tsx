import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store";
import { columnProps } from "../../Interface/Interface";
import { board } from "../../Interface/Interface";
import { column } from "../../Interface/Interface";
import { task } from "../../Interface/Interface";
import "./board.css";
import Column from "./Column";

import "./board.css";
import { title } from "process";
function Board() {
	const dispatch = useDispatch();
	const tab = useSelector((state: RootState) => state.tabs);
	const board = useSelector((state: RootState) => state.data.data);
	// function columnData() {
	// 	const columnDatas = board.find((x) => x.name === tab);
	// 	return columnDatas;
	// }
	const columnDatas = board.filter((x) => x.name === tab);
	const findCurrentData = board.find((x) => x.name === tab);

	return (
		<div className="board">
			{findCurrentData?.columns.map((columnData: column) => (
				<>
					<Column columnData={columnData} />
				</>
			))}
			{/* {columnDatas.map((val) => (
				<>
					<Column
						columnData={{
							id: val.name,
							name: val.name,
							tasks: [
								{
									id: "cs",
									title: "cs",
									desciption: "sdds",
									status: "todo",
								},
							],
						}}
					/>
				</>
			))} */}
			{/* {<Column columnData={{ id: "1", name: "ahmed", tasks: [] }} />} */}
		</div>
	);
}

export default Board;
