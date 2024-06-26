import React, { useContext, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import "./Sidebar.css";
import { Context } from "../../context/Context";

const Sidebar = () => {
	const [extened, setExtened] = useState(false);
	const { onSent, prevPrompts, setRecentPrompt, newChat, setNotImpl } =
		useContext(Context);

	const loadPrompt = async (prompt) => {
		setRecentPrompt(prompt);
		await onSent(prompt);
	};

	return (
		<div className="sidebar">
			<div className="top">
				<IoMenu onClick={() => setExtened((prev) => !prev)} className="menu" />
				{/* memu icons */}
				<div className="new-chat" onClick={() => newChat()}>
					<FaPlus /> {/* memu icons */}
					{extened ? <p>New Chat</p> : null}
				</div>
				{extened ? (
					<div className="recent">
						<p className="recent-title">Recent</p>
						{prevPrompts.map((item, i) => {
							if (item === "") {
								return;
							}
							return (
								<div className="recent-entry" onClick={() => loadPrompt(item)}>
									<IoChatboxOutline />
									<p>{item.slice(0, 17)}...</p>
								</div>
							);
						})}
					</div>
				) : null}
			</div>
			<div className="bottom">
				{/* <BottomItems
					objarr={[
						{ icon: BsQuestionLg, divcontent: "help", state: extened },
					]}
				/> */}
				<div
					className="bottom-item recent-entry"
					onClick={() => setNotImpl((prev) => !prev)}
				>
					<BsQuestionLg />
					{extened ? <p>help</p> : null}
				</div>
				<div
					className="bottom-item recent-entry"
					onClick={() => setNotImpl((prev) => !prev)}
				>
					<FaHistory />
					{extened ? <p>History</p> : null}
				</div>
				<div
					className="bottom-item recent-entry"
					onClick={() => setNotImpl((prev) => !prev)}
				>
					<IoSettingsOutline />
					{extened ? <p>settings</p> : null}
				</div>
			</div>
		</div>
	);
};

const BottomItems = (props) => {
	console.log(props.objarr);
	props.objarr.map((key) => {
		return (
			<div className="bottom-item recent-entry">
				{key.icon}
				{key.state ? <p>{key.divcontent}</p> : null}
			</div>
		);
	});
};
export default Sidebar;
