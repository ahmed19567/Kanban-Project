import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store";
import { boardIcon, whiteBoardIcon } from "../../Icons/Icon";

interface tab {
	name: string;
	defaultTab: string;
	className?: string;
	onClick: () => void;
}

function Tab(props: tab) {
	const tab = useSelector((state: RootState) => state.tabs);

	const { name, defaultTab } = props;

	return (
		<button
			className={
				tab === name ? "sidenav_btn sidenav_btn_active" : "sidenav_btn"
			}
			onClick={props.onClick}
		>
			{tab === name ? (
				<div className="">{whiteBoardIcon}</div>
			) : (
				<div className="">{boardIcon}</div>
			)}

			<p>{name}</p>
		</button>
	);
}

export default Tab;
