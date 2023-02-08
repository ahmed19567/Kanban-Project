import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
	name: "sidebarVis",
	initialState: true,
	reducers: {
		hideSidebar: () => false,
		showSidebar: () => true,
	},
});

export const { hideSidebar, showSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
