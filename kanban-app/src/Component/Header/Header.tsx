import icon from "../../assets/logo-mobile.svg";
import whiteLogo from "../../assets/logo-light.svg";
import blackLogo from "../../assets/logo-dark.svg";
import { verticalellipsis } from "../../Icons/Icon";
import { useSelector, useDispatch } from "react-redux";
import DropDown from "../ReusableComponents/DropDown/DropDown";
import { openModal, closeModal } from "../../Features/ModalSlice";
import { addTask } from "../../Features/DataSlice";
import { RootState } from "../../Store";
import "./header.scss";
function Header() {
	const tab = useSelector((state: RootState) => state.tabs);
	const theme = useSelector((state: RootState) => state.data.colorTheme);
	const dispatch = useDispatch();

	function handleModal() {
		dispatch(openModal({ moduleType: "DeleteBoard" }));
	}
	function editModal() {
		dispatch(openModal({ moduleType: "AddColumn" }));
	}

	function addTask() {
		dispatch(openModal({ moduleType: "AddNewTask" }));
	}

	return (
		<header className={`header ${theme}`}>
			<div className="header_div_one">
				{theme === "dark" ? (
					<picture className="=header_logo">
						<img src={whiteLogo} alt="" />
					</picture>
				) : (
					<picture className="=header_logo">
						<img src={blackLogo} alt="" />
					</picture>
				)}
			</div>
			<div className="header_div_two">
				<div className="launch">
					<h2>{tab}</h2>
					<div className="launch_button_container">
						<button className="launch_button" onClick={addTask}>
							&nbsp; + Add New Task
						</button>
						<DropDown
							className="svg_icon"
							title="Board"
							onDelete={handleModal}
							onEdit={editModal}
						>
							{verticalellipsis}
						</DropDown>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
