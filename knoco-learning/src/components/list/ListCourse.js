import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import logo from './featured.png';
import "../../style/Teacher/List.css";
import { API_BASE_URL } from "../../paths";

const ListCourse = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/Course/GetAllCourses`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    function formatAPIDate(apiDate) {
        return new Date(apiDate).toLocaleDateString('en-US');
    }

    return (
        <div className="list-course">
            {data.length > 0 ? (
                data.map((course, index) => (
                    <div key={index} className="items-course">
                        <div className="img-course">
                            <img className="img-cour" src={`${API_BASE_URL}/Photos/${course.image}` || "https://reactjs.org/logo-og.png"} alt={course.courseName} />
                        </div>
                        <div className="course">
                            <div className="first-info">
                                <small className="m-0"><i className="text-primary"></i></small>
                                <small className="m-0"><i className="text-primary"></i>{formatAPIDate(course.createDate)}</small>
                            </div>
                            <Link className="a-link h5" to={`/choose-class/${course.courseId}`}>{course.courseName}</Link>
                            <p>{course.description}</p>
                        </div>
                    </div>
                ))
            ) : (
                // <p>Loading class information...</p>
                <div className="items-course">
                    <div className="img-course">
                        <img className="img-cour" src={"https://reactjs.org/logo-og.png" || "https://reactjs.org/logo-og.png"} alt="courseName" />
                    </div>
                    <div className="course">
                        <div className="first-info">
                            <small className="m-0"><i className="text-primary"></i></small>
                            <small className="m-0"><i className="text-primary"></i>Null</small>
                        </div>
                        <Link className="a-link h5" to={`/class-empty/0`}>Null</Link>
                        <p>Null</p>
                    </div>
                </div>
            )}
        </div>
    )
};

export default memo(ListCourse);