import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./Store";
import { Provider } from "react-redux";
import { saveState } from "./Features/Browser-Storage";
import { debounce } from "lodash";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

store.subscribe(
	debounce(() => {
		saveState(store.getState());
	}, 1000)
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
