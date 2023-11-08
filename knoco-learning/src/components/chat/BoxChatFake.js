import React from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl } from "react-bootstrap";
import { faArrowLeft, faLocationArrow, faPaperclip, faTrash } from "@fortawesome/free-solid-svg-icons";
const BoxChatFake = () => {
    return(
        <div className="chat-box">
            <div className="card">
			<div className="card-header msg_head">
                <div className="d-flex">
                    <button>
                        <FontAwesomeIcon className="back-btn" icon={faArrowLeft}/>
                    </button>
                </div>
				<div className="d-flex">
					<div className="img_cont">
						<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"/>
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
				<div className="d-flex justify-content-start mb-4">
					<div className="img_cont_msg">
						<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg"/>
					</div>
					<div className="msg_cotainer">
						Hi, how are you?
						<span className="msg_time">8:40 AM, Today</span>
					</div>
				</div>
				<div className="d-flex justify-content-end mb-4">
					<div className="msg_cotainer_send">
						I'm fine, thank you and you?
						<span className="msg_time_send">8:55 AM, Today</span>
					</div>
					<div className="img_cont_msg">
				        <img src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256" className="rounded-circle user_img_msg"/>
					</div>
				</div>
				<div className="d-flex justify-content-start mb-4">
					<div className="img_cont_msg">
						<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg"/>
					</div>
					<div className="msg_cotainer">
						I am good too
						<span className="msg_time">9:00 AM, Today</span>
					</div>
				</div>
				<div className="d-flex justify-content-end mb-4">
					<div className="msg_cotainer_send">
						You are welcome
						<span className="msg_time_send">9:05 AM, Today</span>
					</div>
					<div className="img_cont_msg">
				        <img src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256" className="rounded-circle user_img_msg"/>
					</div>
				</div>
				<div class="d-flex justify-content-start mb-4">
					<div class="img_cont_msg">
						<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg"/>
					</div>
					<div className="msg_cotainer">
						Lorem ipsum
						<span class="msg_time">9:07 AM, Today</span>
					</div>
				</div>
				<div className="d-flex justify-content-end mb-4">
					<div className="btn_del_msg">
						<button><FontAwesomeIcon icon={faTrash}/></button>
					</div>
					<div className="msg_cotainer_send">
                        Lorem ipsum
						<span className="msg_time_send">9:10 AM, Today</span>
					</div>
					<div className="img_cont_msg">
			            <img src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256" className="rounded-circle user_img_msg"/>
					</div>
				</div>
				<div className="d-flex justify-content-start mb-4">
					<div className="img_cont_msg">
						<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg"/>
					</div>
					<div className="msg_cotainer">
						Bye 
					    <span className="msg_time">9:12 AM, Today</span> 
					</div>
					<div className="btn_del_msg">
						<button><FontAwesomeIcon icon={faTrash}/></button>
					</div>
				</div>
                <div className="d-flex justify-content-start mb-4">
					<div className="img_cont_msg">
						<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg"/>
					</div>
					<div className="msg_cotainer">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"/>
					    <span className="msg_time">9:12 AM, Today</span>
					</div>
					<div className="btn_del_msg">
						<button><FontAwesomeIcon icon={faTrash}/></button>
					</div>
				</div>
                <div className="d-flex justify-content-end mb-4">
					<div className="msg_cotainer_send">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"/>
						<span className="msg_time_send">9:10 AM, Today</span>
					</div>
					<div className="img_cont_msg">
			            <img src="https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256" className="rounded-circle user_img_msg"/>
					</div>
				</div>
			</div>
			<div className="card-footer">
			    <div className="input-group">
				    <div className="input-group-append btn-left">
						<span className="attach_btn">
                            <FontAwesomeIcon  icon={faPaperclip} />
                        </span>
					</div>
					<textarea name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
					<div className="input-group-append btn-right">
					    <span className="send_btn">
                            <FontAwesomeIcon  icon={faLocationArrow} />
                        </span>
					</div>
				</div>
			</div>
			</div>
        </div>
        
    )
}
export default BoxChatFake;