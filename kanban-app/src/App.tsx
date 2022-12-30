import { useEffect, useState } from "react";
import Header from "./Component/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Store";
import { addData, getData } from "./Features/DataSlice";
import { loadState } from "./Features/Browser-Storage";
import { store } from "./Store";
import data from "./Data/data.json";

import "./App.css";

function App() {
	const [datas, setDatas] = useState(data);
	const board = useSelector((state: RootState) => state.data);
	const disPatch = useDispatch();

	useEffect(() => {
		const persistData = loadState();
		disPatch(addData(datas.boards));
	}, []);

	return (
		<div className="App ">
			<Header />
		</div>
	);
}

export default App;
