import React from "react";
interface tab {
	name: string;
	defaultTab: number;
}

function Tab(props: tab) {
	const { name, defaultTab } = props;
	return <>{name}</>;
}

export default Tab;
