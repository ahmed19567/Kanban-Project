import React from "react";
import { columnProps } from "../../Interface/Interface";
import { task } from "../../Interface/Interface";
import Card from "./Card";
function Column(props: columnProps) {
	return (
		<div className="column">
			<div className="column_title_div">
				<span className="ballcolor"></span>
				<p className="props_title">{props.columnData.name}</p>
			</div>
			{props.columnData.tasks.map((data: task) => (
				<>
					<Card
						id={data.id}
						title={data.title}
						description={data.description}
						status={data.status}
						subtasks={data.subtasks}
					/>
				</>
			))}

			{/* <div className="column_title">{props.columnData.names}</div> */}
		</div>
	);
}

export default Column;
