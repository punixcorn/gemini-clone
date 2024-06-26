import React, { useContext, useState } from "react";
import "./Body.css";
import { SiGooglegemini } from "react-icons/si";
import { IoCompassOutline } from "react-icons/io5";
import { MdLightbulbOutline } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { FaCode } from "react-icons/fa6";
import { ReactTyped } from "react-typed";

/* 
image by 
Beatrice Ferretti @ Sep 14, 2022
https://discover.therookies.co/2022/09/14/creating-a-striking-3d-portrait-things-you-need-to-know/
*/
import user from "../../assets/user.jpg";
import { RiMicLine } from "react-icons/ri";
import { LuSendHorizonal } from "react-icons/lu";
import { Context } from "../../context/Context";

const Card = (props) => {
	return (
		<div>
			<div className="card">
				<p> {props.text} </p>
				<props.icon className="img" />
			</div>
		</div>
	);
};

const Body = () => {
	const {
		onSent,
		recentPrompt,
		showResult,
		loading,
		resultData,
		setInput,
		input,
		notImpl,
		setNotImpl,
	} = useContext(Context);
	const [hover, setHover] = useState(false);

	const onHover = () => {
		setHover((e) => !e);
	};

	return (
		<div className="main">
			<div className="nav">
				<p>Gemini</p>
				<img
					src={user}
					alt="Beatrice Ferretti @ https://discover.therookies.co/2022/09/14/creating-a-striking-3d-portrait-things-you-need-to-know/"
					onMouseEnter={onHover}
					onMouseLeave={onHover}
					onTouchStart={onHover}
					onTouchEnd={onHover}
					onClick={() => {}}
				/>
				{hover ? (
					<p className="hover-image">
						image by Beatrice Ferretti @ discover.therookies.co
					</p>
				) : null}
			</div>
			<div className="main-container">
				{notImpl ? (
					<div className="not-implemented">Not implemented :(</div>
				) : null}
				{!showResult ? (
					<>
						<div className="greet">
							<p>
								<span>hello, Dev</span>
							</p>
							<p>How can I help you today?</p>
						</div>
						<div className="cards">
							<Card
								text={
									"Suggest beautiful places to see on an upcoming road trip"
								}
								icon={IoCompassOutline}
							/>
							<Card
								text={"Briefly summarize this concept: urban planning"}
								icon={MdLightbulbOutline}
							/>
							<Card
								text={"Brainstorm team bonding activities for our work retreat"}
								icon={FaRegMessage}
							/>
							<Card
								text={"Improve the readablilty of the following code"}
								icon={FaCode}
							/>
						</div>
					</>
				) : (
					<div className="result">
						<div className="result-title">
							<SiGooglegemini />
							<p>
								<ReactTyped strings={[recentPrompt]} showCursor={false} />
							</p>
						</div>
						<div className="result-data">
							{loading ? (
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							) : (
								<ReactTyped strings={[resultData]} className="result-print" />
								//<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
							)}
						</div>
					</div>
				)}
			</div>
			<div className="main-bottom">
				<div className="search-box">
					<input
						onChange={(e) => {
							setInput(e.target.value);
						}}
						type="text"
						value={input}
						placeholder="What would you like to do today?"
					></input>
					<div>
						<CiImageOn
							className="img"
							onClick={() => setNotImpl((prev) => !prev)}
						/>
						<RiMicLine
							className="img"
							onClick={() => setNotImpl((prev) => !prev)}
						/>
						{input ? (
							<LuSendHorizonal
								onClick={() => {
									onSent();
								}}
								className="img"
							/>
						) : null}
					</div>
				</div>
				<p className="bottom-info">
					Gemini may Display inaccurate info, including about people, so
					double-check its responses. Your privacy and Gemini Apps
				</p>
			</div>
		</div>
	);
};

export default Body;
