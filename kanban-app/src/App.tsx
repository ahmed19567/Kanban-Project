import { useEffect, useState } from "react";
import Header from "./Component/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Store";
import { addData, setCurrentStatus } from "./Features/DataSlice";
import { loadState } from "./Features/Browser-Storage";
import { setTheme } from "./Features/DataSlice";
import SideNav from "./Component/SideNav/SideNav";
import Board from "./Component/Board/Board";
import Modal from "./Component/Modal/Modal";

import "./App.css";

function App() {
	const theme = useSelector((state: RootState) => state.data.colorTheme);
	const disPatch = useDispatch();
	useEffect(() => {
		const persistData = loadState();
		const fetchData = async () => {
			try {
				const response = await import("./Data/data.json");
				const data = response.boards;
				disPatch(addData(data));
			} catch (err) {
				console.error(err);
			}
		};

		if (persistData && persistData.data.data.length === 0) {
			fetchData();
		}
	}, []);

	function toggleColor() {
		if (theme === "dark") disPatch(setTheme("light"));
		else if (theme === "light") disPatch(setTheme("dark"));
	}

	return (
		<div className={`App ${theme}`}>
			<Header />
			<main className="main">
				<SideNav toggleTheme={toggleColor} theme={theme} />
				<Board />
			</main>

			<Modal />
		</div>
	);
}

export default App;
