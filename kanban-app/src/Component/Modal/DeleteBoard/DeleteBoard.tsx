import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Store";
import { deleteBoard } from "../../../Features/DataSlice";
import { closeModal } from "../../../Features/ModalSlice";
import Modal from "../../ReusableComponents/Modal/Modal";
import "./deleteboard.scss";

function DeleteBoard(props: any) {
	const { theme } = props;
	const data = useSelector((state: RootState) => state.data.data);
	const boardValue = useSelector((state: RootState) => state.tabs);
	const dispatch = useDispatch();

	function remove() {
		dispatch(deleteBoard({ board: boardValue }));
		dispatch(closeModal());
	}

	return (
		<Modal>
			<div className={`deleteboard ${theme}`}>
				<h2>Delete this board?</h2>
				<p>Are you sure you want to delete the {`${boardValue}`} board?</p>
				<div className="deletediv">
					<button onClick={remove}>Delete</button>
					<button>Cancel</button>
				</div>
			</div>
		</Modal>
	);
}

export default DeleteBoard;
