import React from "react";
import icon from "../../assets/logo-mobile.svg";
import title from "../../assets/logo-light.svg";
import verticalellipsis from "../../assets/icon-vertical-ellipsis.svg";
import "./header.css";
function Header() {
	return (
		<div className="header">
			<div className="header_div_one">
				{/* <img src={icon} alt="" /> */}
				<picture className="=header_logo">
					<img src={title} alt="" />
				</picture>
			</div>
			<div className="header_div_two">
				<div className="launch">
					<h3>Platform Launch</h3>
					<div className="launch_button_container">
						<button className="launch_button">&nbsp; + Add New Task</button>
						<div className="svg_icon">
							<img src={verticalellipsis} alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
