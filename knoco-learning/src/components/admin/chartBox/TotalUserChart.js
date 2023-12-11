import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../paths";
const TotalUser = () => {
    const [totalUsers, setTotalUsers] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/Admin/GetTotal`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Data from API:", data);
                setTotalUsers(data);
            })
            .catch((error) => {
                console.error("Lỗi khi gọi API:", error);
            });
    }, []);

    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <BiUser />
                    <span>Total Users</span>
                </div>
                <h1>{totalUsers.totalUser}</h1>
                <Link to="/users" style={{ color: 'red'}}>
                    View all
                </Link>
            </div>
        </div>
    );
};

export default TotalUser;
