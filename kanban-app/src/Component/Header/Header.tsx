import icon from "../../assets/logo-mobile.svg";
import title from "../../assets/logo-light.svg";
import verticalellipsis from "../../assets/icon-vertical-ellipsis.svg";
import { useSelector, useDispatch } from "react-redux";
import DropDown from "../ReusableComponents/DropDown/DropDown";
import { openModal, closeModal } from "../../Features/ModalSlice";
import { RootState } from "../../Store";
import "./header.css";
function Header() {
	const tab = useSelector((state: RootState) => state.tabs);
	const dispatch = useDispatch();

	function handleModal() {
		dispatch(openModal({ moduleType: "DeleteBoard" }));
		// dispatch(closeModal());
	}
	function editModal() {
		dispatch(openModal({ moduleType: "AddColumn" }));
	}

	return (
		<header className="header">
			<div className="header_div_one">
				{/* <img src={icon} alt="" /> */}
				<picture className="=header_logo">
					<img src={title} alt="" />
				</picture>
			</div>
			<div className="header_div_two">
				<div className="launch">
					<h3>{tab}</h3>
					<div className="launch_button_container">
						<button className="launch_button">&nbsp; + Add New Task</button>
						{/* <div> */}
						<DropDown
							className="svg_icon"
							title="Board"
							onDelete={handleModal}
							onEdit={editModal}
						>
							<img src={verticalellipsis} title="Board" />
						</DropDown>
						{/* </div> */}
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
