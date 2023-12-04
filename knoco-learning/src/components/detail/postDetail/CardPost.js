import React from "react";
import myImage from './profile.jpg';
import './style.css';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from 'react-toastify';
import { API_BASE_URL } from "../../../paths";
const CardPost = () => {

    const [listComment, setListComment] = useState([]);
    const [postDetail, setPostDetail] = useState({});
    const [use, setUse] = useState({});
    const { pid } = useParams();
    const [createBy, setCreateBy] = useState('');
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [contentPost, setcontentPost] = useState('');
    const [likeAmout, setlikeAmout] = useState('');
    const [image, setimage] = useState('');
    const [createDate, setcreateDate] = useState('');

    const [UserCommentPostId, setUserCommentPostId] = useState('');
    const [userId, setuserId] = useState('');
    const [PostId, setPostId] = useState('');
    const [Content, setContent] = useState('');
    const [CreateDateComment, setCreateDateComment] = useState('');
    const [LikeAmountComment, setLikeAmountComment] = useState('');
    const [status, setStatus] = useState();
    useEffect(() => {
        fetchData();
    },[pid] );

    const fetchData = async () => {
        const Response = await fetch(`https://localhost:7169/api/Post/GetPostById?Id=${pid}`);
        const Data = await Response.json();
       
            setPostDetail(Data);
            setCreateBy(Data.createBy);
            settitle(Data.title);
            setdescription(Data.description);
            setcontentPost(Data.contentPost);
            setcreateDate(Data.createDate);
            setlikeAmout(Data.likeAmout);
            setimage(Data.image);
      

         fetch(`https://localhost:7169/api/Admin/GetUserById/${Number(Data.createBy)}`)
        .then((response) => response.json())
        .then((data) => {
            setUse(data);
        });
        fetch(`https://localhost:7169/api/Post/ListCommentPost?postId=${pid}`)
            .then((response) => response.json())
            .then((data) => {
                setListComment(data);
            });
    };

    const UpdateHidePost = () => {
        const hidePost = {
            postId: pid,
            createBy: createBy,
            title: title,
            description: description,
            contentPost: contentPost,
            likeAmout: Number(likeAmout),
            image: image,
            createDate: createDate,
            isActive: true

        }

        fetch('https://localhost:7169/api/Post/UpdatePostHide', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hidePost),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Successfull !!!")
                    window.location.href = "/manager/viewpostlistmanager";
                }
                else if (!response.ok) {
                    toast.error("Failed. Try Again!!!")
                    throw new Error('Failed to update');
                }

            })
    }

    // const UpdateHideComment = (commentId) => {

    //     fetch(`https://localhost:7169/api/Post/GetCommentById?commentId=${commentId}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setUserCommentPostId(data.userCommentPostId);
    //         setuserId(data.userId);
    //         setPostId(data.postId);
    //         setContent(data.content);
    //         setCreateDateComment(data.createDate);
    //         setlikeAmout(data.likeAmout);
    //     });

    //     const hideComment = {
    //         userCommentPostId:1,
    //         userId : Number(userId),
    //         postId :Number(PostId),
    //         content :Content,
    //         createDate:CreateDateComment,
    //         likeAmount:Number(LikeAmountComment),
    //         isActive:true
    //     }

    //     fetch('https://localhost:7169/api/Post/UpdateHideComment', {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(hideComment),
    //     })
    //         .then((response) => {
    //             if (response.ok) {

    //             }
    //             else if (!response.ok) {
    //                 throw new Error('Failed to update');
    //             }

    //         })
    // }

    const UpdateHideComment = async (commentId) => {
        try {
            const commentResponse = await fetch(`https://localhost:7169/api/Post/GetCommentById?commentId=${commentId}`);
            const commentData = await commentResponse.json();

            setUserCommentPostId(commentData.userCommentPostId);
            setuserId(commentData.userId);
            setPostId(commentData.postId);
            setContent(commentData.content);
            setCreateDateComment(commentData.createDate);
            setlikeAmout(commentData.likeAmout);

            const hideComment = {
                userCommentPostId: Number(UserCommentPostId),
                userId: Number(userId),
                postId: Number(PostId),
                content: Content,
                createDate: CreateDateComment,
                likeAmount: Number(LikeAmountComment),
                isActive: true
            };

            const updateResponse = await fetch('https://localhost:7169/api/Post/UpdateHideComment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hideComment),
            });

            if (updateResponse.ok) {
                fetchData();
                toast.success("Successfull !!!");
                setStatus(false);
            } else {
                throw new Error('Failed to update');
            }
        } catch (error) {
            toast.error("Failed. Try Again!!!")
            console.error('Error updating comment:', error);
            // Xử lý khi gặp lỗi (ví dụ: hiển thị toast lỗi)

        }
    };
    const UpdateActiveComment = async (commentId) => {
        try {
            const commentResponse = await fetch(`https://localhost:7169/api/Post/GetCommentById?commentId=${commentId}`);
            const commentData = await commentResponse.json();

            setUserCommentPostId(commentData.userCommentPostId);
            setuserId(commentData.userId);
            setPostId(commentData.postId);
            setContent(commentData.content);
            setCreateDateComment(commentData.createDate);
            setlikeAmout(commentData.likeAmout);

            const UnhideComment = {
                userCommentPostId: Number(UserCommentPostId),
                userId: Number(userId),
                postId: Number(PostId),
                content: Content,
                createDate: CreateDateComment,
                likeAmount: Number(LikeAmountComment),
                isActive: true
            };

            const updateResponse = await fetch('https://localhost:7169/api/Post/UpdateUnHideComment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(UnhideComment),
            });

            if (updateResponse.ok) {

                toast.success("Successfull !!!")
                fetchData();
                setStatus(false);
            } else {
                throw new Error('Failed to update');
            }
        } catch (error) {
            toast.error("Failed. Try Again!!!")
            console.error('Error updating comment:', error);
            // Xử lý khi gặp lỗi (ví dụ: hiển thị toast lỗi)

        }
        
    };

    return (
        <div className="post">
            <div className="post-top">
                <div className="user">
                    <div className="user-profile-pic">
                        <img src={myImage} alt="Profile" />
                    </div>
                    <div className="info">
                        <h3>{use.fullName}</h3>
                        <div className="time text-gry">
                            <small>HANOI, <span>2 DAYS AGO</span></small>
                        </div>
                    </div>
                </div>
                <span className="edit-post">
                    <button onClick={UpdateHidePost} >Hide post</button>
                </span>
            </div>

            <div className="detail-post">
                <h4>
                    {postDetail.description}
                </h4>
                <div>
                    <img
                        src={`https://localhost:7169/Photos/${postDetail.image}`}
                        alt="Course Image"
                        style={{ width: '200px', height: '200px' }}
                    />
                </div>
            </div>
            <div className="comments text-gry">
                {listComment.map((comment, index) => (
                    <div key={index} className="comment">
                        <strong>{comment.userFullName}</strong> {comment.content} <span className="edit-comment">
                            {comment.isActive == true ? (<button onClick={() => UpdateHideComment(comment.userCommentPostId)} > Hide
                            </button>) : (<button onClick={() => UpdateActiveComment(comment.userCommentPostId)} >active
                            </button>)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardPost;