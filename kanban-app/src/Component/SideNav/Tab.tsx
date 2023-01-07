import React from "react";

interface tab {
	name: string;
}
function Tab(props: tab) {
	return <div>{props.name}</div>;
}

export default Tab;
