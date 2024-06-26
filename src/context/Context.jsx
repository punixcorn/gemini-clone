import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
	const [input, setInput] = useState(""); // change input ui
	const [recentPrompt, setRecentPrompt] = useState(""); // update current prompt
	const [prevPrompts, setPrevPrompts] = useState([""]); // update previous prompt
	const [showResult, setShowResult] = useState(false); // update if result is curently displayed
	const [loading, setLoading] = useState(false); // update if loading
	const [resultData, setResultData] = useState(""); // current result data
	const [notImpl, setNotImpl] = useState(false);
	const newChat = () => {
		setLoading(false);
		setShowResult(false);
	};

	const onSent = async (prompt) => {
		setResultData("");
		setLoading(true);
		setShowResult(true);
		let response;
		if (prompt !== undefined) {
			response = await run(prompt);
			setRecentPrompt(prompt);
		} else {
			setPrevPrompts((prev) => [...prev, input]);
			setRecentPrompt(input);
			response = await run(input);
		}

		setResultData(response ?? "no data found");
		setLoading(false);
		setInput("");
	};

	const contextValue = {
		onSent,
		prevPrompts,
		setPrevPrompts,
		setRecentPrompt,
		recentPrompt,
		showResult,
		setShowResult,
		setLoading,
		loading,
		resultData,
		input,
		setInput,
		newChat,
		notImpl,
		setNotImpl,
	};

	return (
		<Context.Provider value={contextValue}>{props.children}</Context.Provider>
	);
};

export default ContextProvider;
