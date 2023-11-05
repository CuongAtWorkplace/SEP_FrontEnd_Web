import React from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl } from "react-bootstrap";
import { faArrowLeft, faLocationArrow, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";

const BoxChat = () => {

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://86c6-14-232-78-85.ngrok-free.app/api/ChatRoom/GetAllClassMessages/9');
				if (response.ok) {
					const data = await response.json();
					setMessages(data);
				} else {
					throw new Error('Failed to fetch data');
				}
			} catch (error) {
				console.error('Error fetching messages:', error);
			}
		};

		fetchData();
	}, []);

	const transformedMessages = messages.map(message => {
		return {
			id: message.messageId,
			text: message.content,
			time: message.createDate,
			sender: message.createBy === 2 ? message.fullName : "Other User",
			image: message.photo,
			isSent: message.createBy === 2 ? true : false
		};
	});

	return (
		<div className="chat-box">
			<div className="card">
				<div className="card-header msg_head">
					<div className="d-flex">
						<button>
							<FontAwesomeIcon className="back-btn" icon={faArrowLeft} />
						</button>
					</div>
					<div className="d-flex">
						<div className="img_cont">
							<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
							<span className="online_icon"></span>
						</div>
						<div className="user_info">
							<span>khalid Charif</span>
							<p>1767 Messages</p>
						</div>
					</div>
					<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
					<div className="action_menu">
						<ul>
							<li><i class="fas fa-user-circle"></i> View profile</li>
							<li><i class="fas fa-users"></i> Add to close friends</li>
							<li><i class="fas fa-plus"></i> Add to group</li>
							<li><i class="fas fa-ban"></i> Block</li>
						</ul>
					</div>
				</div>

				<div className="card-body msg_card_body">
					{transformedMessages.map(message => (
						<Message
							key={message.id}
							sender={message.sender}
							text={message.text}
							time={message.time}
							image={message.image}
							isSent={message.isSent}
						/>
					))}
				</div>

				<div className="card-footer">
					<div className="input-group">
						<div className="input-group-append btn-left">
							<span className="attach_btn">
								<FontAwesomeIcon icon={faPaperclip} />
							</span>
						</div>
						<textarea name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
						<div className="input-group-append btn-right">
							<span className="send_btn">
								<FontAwesomeIcon icon={faLocationArrow} />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

const Message = ({ text, time, image, isSent }) => {
	const messageContainerClass = isSent ? 'msg_cotainer_send' : 'msg_cotainer';
	const messageBoxClass = isSent ? 'msg_cotainer' : 'msg_cotainer_send';

	return (
		<div className={`d-flex justify-content-${isSent ? 'end' : 'start'} mb-4`}>
			<div className="img_cont_msg">
				<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
			</div>
			<div className={messageContainerClass}>
				{text}
				<span className={isSent ? "msg_time_send" : "msg_time"}>{time}</span>
			</div>
		</div>
	);
};

export default BoxChat;