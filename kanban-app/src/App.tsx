import { useEffect, useState } from "react";
import Header from "./Component/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Store";
import { addData, getData, getId, addBoard } from "./Features/DataSlice";
import { setTab } from "./Features/TabSlice";
import { loadState } from "./Features/Browser-Storage";
import { store } from "./Store";
import SideNav from "./Component/SideNav/SideNav";
import Board from "./Component/Board/Board";
import { column } from "./Interface/Interface";
import { openModal } from "./Features/ModalSlice";
import Modal from "./Component/Modal/Modal";
import data from "./Data/data.json";
import "./App.css";
import AddBoard from "./Component/Modal/AddBoard/AddBoard";

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
			<main>
				<SideNav />
				<Board />
			</main>
			{/* <AddBoard /> */}
			<Modal />
		</div>
	);
}

export default App;
