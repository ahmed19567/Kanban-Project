import { useEffect, useState } from "react";
import Header from "./Component/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Store";
import { addData } from "./Features/DataSlice";
import { setTab } from "./Features/TabSlice";
import { loadState } from "./Features/Browser-Storage";
import SideNav from "./Component/SideNav/SideNav";
import Board from "./Component/Board/Board";
import Modal from "./Component/Modal/Modal";
import data from "./Data/data.json";
import Input from "./Component/ReusableComponents/Input/Input";
import "./App.css";
import ScrollContainer from "react-indiana-drag-scroll";
import ViewTask from "./Component/Modal/ViewTask/ViewTask";
import DropDown from "./Component/ReusableComponents/DropDown/DropDown";
import EditTask from "./Component/Modal/EditTask/EditTask";
// import AddBoard from "./Component/Modal/AddBoard/AddBoard";
// import AddNewColumn from "./Component/Modal/AddNewColumn/AddNewColumn";
// import DeleteBoard from "./Component/Modal/DeleteBoard/DeleteBoard";

function App() {
	const [datas, setDatas] = useState(data);
	const board = useSelector((state: RootState) => state.data);
	const tab = useSelector((state: RootState) => state.tabs);
	const modals = useSelector((state: RootState) => state.modal.moduleType);

	const disPatch = useDispatch();

	useEffect(() => {
		const persistData = loadState();
		disPatch(addData(datas.boards));
		disPatch(setTab(board.data[0].name));
	}, []);

	return (
		<div className="App ">
			<Header />
			{/* <ScrollContainer className="scroll_container" vertical={true}> */}
			<main>
				<SideNav />
				<Board />
			</main>
			{/* </ScrollContainer> */}
			{/* <ViewTask /> */}
			{/* <Modal /> */}
			<EditTask />
		</div>
	);
}

export default App;
