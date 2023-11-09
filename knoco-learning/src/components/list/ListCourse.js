import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import logo from './featured.png';
import "../../style/Teacher/List.css";
const ListCourse = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Course/GetAllCourses`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    return (
        <div className="list-course">
            {data.length > 0 ? (
                data.map((course, index) => (
                    <div key={index} className="items-course">
                        <div className="img-course">
                            <img src="https://reactjs.org/logo-og.png" alt={course.courseName} />
                        </div>
                        <div className="course">
                            <div className="first-info">
                                <small className="m-0"><i className="text-primary"></i></small>
                                <small className="m-0"><i className="text-primary"></i>{formatDate(course.createDate)}</small>
                            </div>
                            <Link className="a-link h5" to={`/class-empty/${course.courseId}`}>{course.courseName}</Link>
                            <p>{course.description}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading class information...</p>
            )}
        </div>
    )
};

export default memo(ListCourse);