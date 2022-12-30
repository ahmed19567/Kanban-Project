import React from "react";
import "./addtask.css";
function AddNewTask() {
	return (
		<div className="overlay">
			<div className="form_container">
				<form className="form">
					<div className="form_div_one">
						<h3>Add New Task</h3>
						<div className="label_form">
							<label htmlFor="title">Title</label>
							<input type="text" id="title" />
						</div>
					</div>
					<div className="form_div_two">
						<div className="textarea_form">
							<label htmlFor="textfield">Description</label>
							<textarea id="textfield" />
						</div>
					</div>
					<div className="form_div_three">
						<label htmlFor="subtask">SubTask</label>

						<div className="textarea_form">
							<input type="text" id="subtask" />
						</div>
					</div>
					<div className="form_div_four">
						<button className="form_div_four_subtask_btn">
							&nbsp; + Add New Task
						</button>
					</div>
					<div className="form_div_five">
						<span>Status</span>
						<button className="select_drop_down">ToDO</button>
					</div>
					<div className="form_div_six">
						<button className="create_task_btn">Create Task</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddNewTask;
