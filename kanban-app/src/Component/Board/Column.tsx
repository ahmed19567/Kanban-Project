import React from "react";
import { columnProps } from "../../Interface/Interface";
// import Card from "./Card";
function Column(props: columnProps) {
	return (
		<div className="column">
			{props.columnData.name}
			{props.columnData.tasks.map((x) => (
				<p>{x.title}</p>
			))}
			{/* <div className="column_title">{props.columnData.names}</div> */}
		</div>
	);
}

export default Column;
