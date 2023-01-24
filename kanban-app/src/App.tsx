import { useEffect, useState } from "react";
import Header from "./Component/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Store";
import { addData } from "./Features/DataSlice";
import { setTab } from "./Features/TabSlice";
import { loadState } from "./Features/Browser-Storage";
import { setTheme } from "./Features/DataSlice";
import SideNav from "./Component/SideNav/SideNav";
import Board from "./Component/Board/Board";
import Modal from "./Component/Modal/Modal";
import data from "./Data/data.json";
import Input from "./Component/ReusableComponents/Input/Input";
import "./App.css";
import ScrollContainer from "react-indiana-drag-scroll";
// import ViewTask from "./Component/Modal/ViewTask/ViewTask";
// import DropDown from "./Component/ReusableComponents/DropDown/DropDown";
// import EditTask from "./Component/Modal/EditTask/EditTask";
// import AddNewTask from "./Component/Modal/AddNewTask/AddNewTask";

function App() {
	const [datas, setDatas] = useState(data);
	const board = useSelector((state: RootState) => state.data);
	const theme = useSelector((state: RootState) => state.data.colorTheme);
	const tab = useSelector((state: RootState) => state.tabs);
	const modals = useSelector((state: RootState) => state.modal.moduleType);

	const disPatch = useDispatch();

	useEffect(() => {
		const persistData = loadState();
		disPatch(addData(datas.boards));
		disPatch(setTab(board.data[0].name));
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
