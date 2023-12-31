import React, { useEffect, useState } from "react";
import {BsBook } from 'react-icons/bs'
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../paths";
const TotalCourse = () => {
    const [totalCourses, setTotalCourses] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/Admin/GetTotal`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Data from API:", data);
                setTotalCourses(data);
            })
            .catch((error) => {
                console.error("Lỗi khi gọi API:", error);
            });
    }, []);

    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <BsBook />
                    <span>Total Courses</span>
                </div>
                <h1>{totalCourses.totalcourse}</h1>
                <Link to="/course" style={{ color: 'skyblue'}}>
                    View all
                </Link>
            </div>
        </div>
    );
};

export default TotalCourse;
