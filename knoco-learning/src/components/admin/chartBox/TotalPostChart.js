import React, { useEffect, useState } from "react";
import { BsFileEarmarkPost } from 'react-icons/bs'
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../paths";
const TotalPost = () => {
    const [totalPosts, setTotalPosts] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/Admin/GetTotal`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Data from API:", data);
                setTotalPosts(data);
            })
            .catch((error) => {
                console.error("Lỗi khi gọi API:", error);
            });
    }, []);

    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <BsFileEarmarkPost />
                    <span>Total Posts</span>
                </div>
                <h1>{totalPosts.totalPost}</h1>
                <Link to="" style={{ color: 'gold'}}>
                    View all
                </Link>
            </div>
        </div>
    );
};

export default TotalPost;
