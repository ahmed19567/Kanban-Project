import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store";
import { setTheme } from "../Features/DataSlice";
import SideNav from "./SideNav/SideNav";
import Board from "./Board/Board";

function Main() {
	const [hideSideNav, setHideSideNav] = useState<boolean>(false);
	const theme = useSelector((state: RootState) => state.data.colorTheme);

	const dispatch = useDispatch();
	function toggleColor() {
		if (theme === "dark") dispatch(setTheme("light"));
		else if (theme === "light") dispatch(setTheme("dark"));
	}
	function toggleSideNav() {
		setHideSideNav(!hideSideNav);
	}

	return (
		<main className="main">
			<SideNav toggleTheme={toggleColor} theme={theme} />
			<Board />
		</main>
	);
}

export default Main;
