import React, { ReactNode, CSSProperties } from "react";
import "./button.css";
interface ButtonProps {
	isActive?: boolean;
	type?: "button" | "reset" | "submit";
	isCompleted?: boolean;
	children: ReactNode;
	className?: string;
	colorTheme?: string;
	style?: CSSProperties;
	onClick?: () => void;
	defaultTab?: number;
}

function Button(props: ButtonProps) {
	return (
		<button onClick={props.onClick} className={`${props.className}`}>
			{props.children}
		</button>
	);
}

export default Button;
