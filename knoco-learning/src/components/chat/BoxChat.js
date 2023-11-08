import React, { useState, useEffect, useRef } from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl } from "react-bootstrap";
import { faArrowLeft, faLocationArrow, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from 'react-dropzone';



const BoxChat = () => {
	const [messageText, setMessageText] = useState(''); // Thêm state để lưu trữ nội dung tin nhắn
	const [messages, setMessages] = useState([]);
	const [classData, setClassData] = useState([]);
	const [imagePicker, setImagePicker] = useState(null);
	const [image, setImage] = useState(null);

	const scrollViewRef = useRef(null);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch('http://localhost:7169/api/ChatRoom/GetAllClassMessages/9');
				if (response.ok) {
					const data = await response.json();
					setMessages(data);
				} else {
					throw new Error('Failed to fetch messages');
				}
			} catch (error) {
				console.error('Error fetching messages:', error);
			}
		};

		const fetchClassData = async () => {
			try {
				const response = await fetch('http://localhost:7169/api/Class/GetClassById/GetClassById/9');
				if (response.ok) {
					const data = await response.json();
					setClassData(data);
				} else {
					throw new Error('Failed to fetch class data');
				}
			} catch (error) {
				console.error('Error fetching class data:', error);
			}
		};

		fetchMessages();
		fetchClassData();
	}, []);

	useEffect(() => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo({
				top: scrollViewRef.current.scrollHeight,
				behavior: 'smooth'
			});
		}
	}, [messages]);

	const classname = classData.length > 0 ? classData[0].classname : "Loading...";
	const numberStudent = classData.length > 0 ? classData[0].numberStudent : "Loading...";

	const onDrop = (acceptedFiles) => {
		// Xử lý khi người dùng chọn ảnh thành công
		const file = acceptedFiles[0];
		const reader = new FileReader();

		reader.onload = () => {
			// Cập nhật state với ảnh đã chọn
			console.log("Cập nhật state với ảnh đã chọn");
			setImagePicker(reader.result);
		};

		reader.readAsDataURL(file);
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop });



	const transformedMessages = messages.map(message => ({
		id: message.messageId,
		text: message.content,
		time: message.createDate,
		sender: message.createBy === 2 ? message.fullName : "Other User",
		image: message.photo,
		isSent: message.createBy === 2,
	}));

	const sendMessage = async () => {
		if (messageText.trim() !== '') {
			try {
				const response = await fetch(`http://localhost:7169/api/ChatRoom/AddMessage/9/4`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						content: messageText,
						photo: ""
					}),
				});
				if (response.ok) {
					// Nếu gửi thành công, cập nhật lại danh sách tin nhắn
					setMessageText(""); // Xóa nội dung tin nhắn sau khi gửi
				} else {
					throw new Error('Failed to send message');
				}
			} catch (error) {
				console.error('Error sending message:', error);
			}
		}
	};

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
							<span>{classname}</span>
							<p>student in class: {numberStudent}</p>
						</div>
					</div>
					<span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
					<div className="action_menu">
						<ul>
							<li><i className="fas fa-user-circle"></i> View profile</li>
							<li><i className="fas fa-users"></i> Add to close friends</li>
							<li><i className="fas fa-plus"></i> Add to group</li>
							<li><i className="fas fa-ban"></i> Block</li>
						</ul>
					</div>
				</div>

				<div ref={scrollViewRef} className="card-body msg_card_body">
					{transformedMessages.map(message => (
						<Message
							key={message.id}
							sender={message.sender}
							text={message.text}
							time={message.time}
							image={message.image}
							isSent={message.isSent}
							messageId={message.id}
						/>
					))}
				</div>
				{imagePicker && <img src={imagePicker} style={{height:100 , width:100, borderRadius:20 , marginLeft:30}}/>}

				<div className="card-footer">
					<div className="input-group">
						<div className="input-group-append btn-left">
							<div {...getRootProps()} className="attach_btn">
								<input {...getInputProps()} />
								<FontAwesomeIcon icon={faPaperclip} />
							</div>
						</div>
						<textarea
							name=""
							className="form-control type_msg"
							placeholder="Type your message..."
							value={messageText}
							onChange={(e) => setMessageText(e.target.value)}
						></textarea>
						<div className="input-group-append btn-right" onClick={sendMessage}>
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

const Message = ({ text, time, isSent, messageId, image }) => {
	const messageContainerClass = isSent ? 'msg_cotainer_send' : 'msg_cotainer';

	return (
		<div className={`d-flex flex-column ${isSent ? 'justify-content-end' : 'justify-content-start'} mb-4`}>
			{image !== '' ? (
				<div className={messageContainerClass}>
					<img src={`http://localhost:7169/api/ChatRoom/GetImage/${messageId}`} />
					<span className={isSent ? "msg_time_send" : "msg_time"}>{formattedDateTime(time)}</span>
				</div>
			) : (
				<div className={messageContainerClass}>
					{text}
					<span className={isSent ? "msg_time_send" : "msg_time"}>{formattedDateTime(time)}</span>
				</div>
			)}
		</div>

	);
};

const formattedDateTime = (dateTimeString) => {
	const date = new Date(dateTimeString);
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	};
	return date.toLocaleDateString(undefined, options);
};

export default BoxChat;
