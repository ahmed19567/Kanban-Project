import { useEffect, useState } from "react";
import Header from "./Component/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Store";
import { addData } from "./Features/DataSlice";
import { loadState } from "./Features/Browser-Storage";
import Modal from "./Component/Modal/Modal";
import Main from "./Component/Main";
import data from "./Data/data.json";
import DeleteBoard from "./Component/Modal/DeleteBoard/DeleteBoard";

import "./App.scss";

function App() {
	const disPatch = useDispatch();

	const theme = useSelector((state: RootState) => state.data.colorTheme);

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

	return (
		<div className={`App ${theme}`}>
			<Header />
			<Main />
			<Modal />
		</div>
	);
}

export default App;
