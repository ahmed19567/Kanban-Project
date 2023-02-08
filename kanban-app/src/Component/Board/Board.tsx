import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store";
import { column } from "../../Interface/Interface";
import { openModal } from "../../Features/ModalSlice";
import { showSidebar } from "../../Features/SideBarSlice";
import "./board.scss";
import Column from "./Column";
import { hideSideBar } from "../../Icons/Icon";

function Board() {
	const dispatch = useDispatch();
	const tab = useSelector((state: RootState) => state.tabs);
	const data = useSelector((state: RootState) => state.data.data);
	const theme = useSelector((state: RootState) => state.data.colorTheme);
	const hideSideNav = useSelector((state: RootState) => state.sideBar);
	const findCurrentData = data.find((x) => x.name === tab);

	const addColumn = () => {
		dispatch(openModal({ moduleType: "AddColumn" }));
	};
	function showSideBar() {
		dispatch(showSidebar());
	}

	return (
		<section
			className={
				hideSideNav
					? `board board_not_full ${theme}`
					: `board boardfull ${theme}`
			}
		>
			{findCurrentData?.columns.map((columnData: column, index: number) => (
				<>
					<Column columnData={columnData} index={index} key={columnData.name} />
				</>
			))}
			<div
				className="column_add_button"
				onClick={() => {
					addColumn();
				}}
			>
				+ New Column
			</div>

			{hideSideNav ? (
				" "
			) : (
				<button onClick={showSideBar} className="showsideBar_btn">
					<i>{hideSideBar}</i>
				</button>
			)}
		</section>
	);
}

export default Board;
