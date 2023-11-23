import React from "react";
import myImage from './profile.jpg';
import './style.css';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from 'react-toastify';
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
    const [createDate,setcreateDate] = useState('');

    const [UserCommentPostId , setUserCommentPostId] = useState('');
    const [userId ,setuserId]= useState('');
    const [PostId ,setPostId]= useState('');
    const [Content ,setContent]= useState('');
    const [CreateDateComment ,setCreateDateComment]= useState('');
    const [LikeAmountComment ,setLikeAmountComment]= useState('');

    useEffect(() => {
        // fetch(`https://localhost:7169/api/User/GetTeacherById/GetUserById/${createBy}`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setUse(data);
        //     });
        fetch(`https://localhost:7169/api/Post/ListCommentPost?postId=${pid}`)
            .then((response) => response.json())
            .then((data) => {
                setListComment(data);
                // setUserCommentPostId(data.userCommentPostId);
                // setuserId(data.userId);
                // setPostId(data.postId);
                // setContent(data.content);
                // setCreateDateComment(data.createDate);
                // setlikeAmout(data.likeAmout);
            });
        fetch(`https://localhost:7169/api/Post/GetPostById?Id=${pid}`)
            .then((response) => response.json())
            .then((data) => {
                setPostDetail(data);
                setCreateBy(data.createBy);
                settitle(data.title);
                setdescription(data.description);
                setcontentPost(data.contentPost);
                setcreateDate(data.createDate);
                setlikeAmout(data.likeAmout);
                setimage(data.image);
            });
    }, [pid]);



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
                    window.location.href = "/viewpostlistmanager";
                }
                else if (!response.ok) {
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
         
           
          } else {
            throw new Error('Failed to update');
          }
        } catch (error) {
          console.error('Error updating comment:', error);
          // Xử lý khi gặp lỗi (ví dụ: hiển thị toast lỗi)
         
        }
        fetch(`https://localhost:7169/api/Post/ListCommentPost?postId=${pid}`)
            .then((response) => response.json())
            .then((data) => {
                setListComment(data);
            });
      };
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
                        <h3>Name</h3>
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
                        <strong>{comment.userFullName}</strong> {comment.content} <span className="edit-comment"><button onClick={() => UpdateHideComment(comment.userCommentPostId)} >Hide comment</button></span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardPost;