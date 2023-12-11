import React, { useState, useEffect, useRef } from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl } from "react-bootstrap";
import { faArrowLeft, faLocationArrow, faPaperclip, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from 'react-dropzone';
import { HubConnectionBuilder } from "@microsoft/signalr";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../paths";




const BoxChat = () => {
	const [messageText, setMessageText] = useState(''); // Thêm state để lưu trữ nội dung tin nhắn
	const [messages, setMessages] = useState([]);
	const [classData, setClassData] = useState([]);
	const [imagePicker, setImagePicker] = useState('');
	const [image, setImage] = useState(null);
	const [connection, setConnection] = useState(null);

	const [User, setUser] = useState('');
	const ClassId = 9;
	const [isManager,setIsManager] = useState(false);
	const {boxchatid}	= useParams();

	const scrollViewRef = useRef(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log(token);
		if (token !== null) {
			const decodedToken = jwtDecode(token);
			const check = decodedToken.roleid;
			if(check == true){
				setIsManager(true);
			}else{
				setIsManager(false);
			}
			setUser(parseInt(decodedToken.userid, 10));

		} else {
			window.location.href = "/";
		}
		const fetchMessages = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}/api/ChatRoom/GetAllClassMessages/` + ClassId);
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
				const response = await fetch(`${API_BASE_URL}/api/Class/GetClassById/GetClassById/` + ClassId);
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


	const handleDelete = (messageId) => {
		fetch(`${API_BASE_URL}/api/ChatRoom/DeleteMessage/` + messageId, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then(response => {
				if (response.ok) {
					setMessages(prevMessages => prevMessages.filter(message => message.messageId !== messageId));
				} else {
				}
			})
			.catch(error => {
				console.error('Lỗi khi xóa tin nhắn:', error);
			});

	};



	useEffect(() => {
		const newConnection = new HubConnectionBuilder()
			.withUrl(`${API_BASE_URL}/chatHub`, { withCredentials: true })
			.build();

		setConnection(newConnection);

		newConnection
			.start()
			.then(() => {
				console.log('Connected to SignalR Hub');
				newConnection.on('ReceiveMessage', (message) => {
					console.log('Received message:', message);
					setMessages((prevMessages) => [...prevMessages, message]);
				});
			})
			.catch((error) =>
				console.log('Error connecting to SignalR Hub: ' + error)
			);

		newConnection.onclose((error) => {
			console.log('SignalR connection closed:', error);
		});

		return () => {
			if (newConnection) {
				newConnection.off('ReceiveMessage');
				newConnection.stop();
			}
		};
	}, []);

	useEffect(() => {
		return () => {
			if (connection) {
				connection.stop();
			}
		};
	}, [connection]);

	useEffect(() => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo({
				top: scrollViewRef.current.scrollHeight,
				behavior: 'smooth'
			});
		}
	}, [messages]);

	const classname = classData.length > 0 ? classData[0].className : "Loading...";
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
		sender: message.fullName,
		image: message.photo,
		isSent: message.createBy === User,
	}));

	const uploadImage = async () => {
		try {
			const formData = new FormData();

			// Check if imagePicker contains image data
			if (imagePicker) {
				const blob = await fetch(imagePicker).then((res) => res.blob());
				formData.append('file', blob, 'image.jpg');

				const uploadResponse = await fetch(`${API_BASE_URL}/api/Post/UploadImage`, {
					method: 'POST',
					body: formData,
				});

				if (uploadResponse.ok) {
					const responseJson = await uploadResponse.text();
					sendMessage(responseJson); // Sending message with the image link after successful upload
				} else {
					throw new Error('Failed to upload image');
				}
			} else {
				sendMessage(""); // Call sendMessage("") if imagePicker is an empty string
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};

	const handleCancelImage = () => {
		setImagePicker("");

	}


	const sendMessage = async (photo) => {
		try {
			const messageData = {
				content: messageText,
				photo: photo // Gán link ảnh vào phần photo của tin nhắn
			};

			const response = await fetch(`${API_BASE_URL}/api/ChatRoom/AddMessage/` + ClassId + `/` + User, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(messageData),
			});

			if (response.ok) {
				handleCancelImage();
				setMessageText("");
			} else {
				throw new Error('Failed to send message');
			}
		} catch (error) {
			console.error('Error sending message:', error);
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
							<span>{isManager ? 'Manager Chat' : classname}</span>
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

				<div ref={scrollViewRef} className={`card-body ${isManager ? 'msg_card_body_manager' : 'msg_card_body'}`}>
					{transformedMessages.map(message => (
						<Message
							key={message.id}
							sender={message.sender}
							text={message.text}
							time={message.time}
							image={message.image}
							isSent={message.isSent}
							messageId={message.id}
							handleDelete={handleDelete} // Truyền hàm handleDelete vào component Message
						/>
					))}
				</div>
				{imagePicker &&
					<div style={{ position: 'relative', display: 'inline-block' }}>
						<div style={{ position: 'relative', display: 'inline-block' }}>
							<img
								src={imagePicker}
								style={{
									height: 100,
									width: 100,
									borderRadius: 20,
									display: 'block',
								}}
								alt="Picked Image"
							/>
							<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} onClick={handleCancelImage}>
								<FontAwesomeIcon icon={faXmark} style={{ color: "#e9eaec", fontSize: '25px' }} />
							</div>
						</div>
					</div>

				}

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
						<div className="input-group-append btn-right" onClick={uploadImage}>
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

const Message = ({ sender, text, time, isSent, messageId, image, handleDelete }) => {
	const messageContainerClass = isSent ? 'msg_cotainer_send' : 'msg_cotainer';

	console.log('Rendering Message:', messageId, image);

	if (image !== '') {
		if (isSent) {
			return (
				<>
					<div className={`d-flex ${isSent ? 'justify-content-end' : 'justify-content-start'} mb-4`}>
						<div className="btn_del_msg">
							<button><FontAwesomeIcon icon={faTrash} /></button>
						</div>
						<div className={messageContainerClass}>
							{text}
						</div>
					</div>
					<div className={`d-flex ${isSent ? 'justify-content-end' : 'justify-content-start'} mb-4`}>
						<div className={messageContainerClass}>
							<img src={`${API_BASE_URL}/api/ChatRoom/GetImage/${messageId}`} />
							<span className={isSent ? "msg_time_send" : "msg_time"}>{formattedDateTime(time)}</span>
						</div>
					</div>
				</>
			);
		} else {
			return (
				<>
					<div className={`d-flex ${isSent ? 'justify-content-end' : 'justify-content-start'}`}>
						<div className="msg_username">
							<span>{sender}</span>
						</div>
					</div>
					<div className={`d-flex ${isSent ? 'justify-content-end' : 'justify-content-start'} mb-4`}>
						<div className={messageContainerClass}>
							{text}
						</div>
					</div>
					<div className={`d-flex ${isSent ? 'justify-content-end' : 'justify-content-start'} mb-4`}>
						<div className={messageContainerClass}>
							<img src={`${API_BASE_URL}/api/ChatRoom/GetImage/${messageId}`} />
							<span className={isSent ? "msg_time_send" : "msg_time"}>{formattedDateTime(time)}</span>
						</div>
					</div>
				</>
			);
		}
	} else {
		if (isSent) {
			return (
				<div className={`d-flex ${isSent ? 'justify-content-end' : 'justify-content-start'} mb-4`}>
					<div className="btn_del_msg" onClick={() => handleDelete(messageId)}>
						<FontAwesomeIcon icon={faTrash} />
					</div>
					<div className={messageContainerClass}>
						{text}
						<span className={isSent ? "msg_time_send" : "msg_time"}>{formattedDateTime(time)}</span>
					</div>
				</div>
			);
		} else {
			return (
				<>
					<div className={`d-flex ${isSent ? 'justify-content-end' : 'justify-content-start'}`}>
						<div className="msg_username">
							<span>{sender}</span>
						</div>
					</div>
					<div className={`d-flex ${isSent ? 'justify-content-end' : 'justify-content-start'} mb-4`}>
						<div className={messageContainerClass}>
							{text}
							<span className={isSent ? "msg_time_send" : "msg_time"}>{formattedDateTime(time)}</span>
						</div>
					</div>
				</>
			);
		}
	}
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
