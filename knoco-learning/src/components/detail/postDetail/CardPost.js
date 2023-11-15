import React from "react";
import myImage from './profile.jpg';
import './style.css';
const CardPost = () => {
    const commentsData = [
        { userName: "User1", comment: "Comment 1" },
        { userName: "User2", comment: "Comment 2" },
        { userName: "User3", comment: "Comment 3" },
        // Add more comments as needed
    ];
    return (
        <div className="post">
            <div className="post-top">
                 <div className="user">
                    <div className="user-profile-pic">
                        <img src={myImage} alt="Profile" />
                    </div>
                    <div className="info">
                        <h3>User name</h3>
                        <div className="time text-gry">
                            <small>HANOI, <span>2 DAYS AGO</span></small>
                        </div>
                    </div>
                </div>
                <span className="edit-post">
                    <button>Hide post</button>
                </span>
            </div>
        
            <div className="detail-post">
                <h4>
                    Talk laksdjf na,mn,zx v,mn lzjksdlf alkdf jasmdf,na sdflasdf 
                </h4>  
            </div>
            <div className="comments text-gry">
                {commentsData.map((comment, index) => (
                    <div key={index} className="comment">
                        <strong>{comment.userName}</strong> {comment.comment} <span className="edit-comment"><button>Hide comment</button></span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardPost;