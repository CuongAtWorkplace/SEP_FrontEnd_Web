import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faPeopleGroup,
    faCalendarDays,
    faSchool,
    faHashtag,
    faMoneyCheckDollar,
    faFileLines,
    faCalendarWeek,
    faPhone
} from '@fortawesome/free-solid-svg-icons';

const CardClass = ({ setIsEditClassPopupVisible }) => {
    const [classDt, setClassDt] = useState(null);
    const params = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Class/GetTeacherClassDetail/${params.classId}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    return (
        <div className="conval">
            {classDt ? (
                <div className="values">
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} />
                        <div>
                            <h3>Class Name</h3>
                            <span>{classDt.className}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faUser} />
                        <div>
                            <h3>Teacher Name</h3>
                            <span>{classDt.teacherName}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faSchool} />
                        <div>
                            <h3>Course Name</h3>
                            <span>{classDt.courseName}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} />
                        <div>
                            <h3>Number Student</h3>
                            <span>{classDt.numberStudent}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faHashtag} />
                        <div>
                            <h3>Topic</h3>
                            <span>{classDt.topic}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faMoneyCheckDollar} />
                        <div>
                            <h3>Fee</h3>
                            <span>{classDt.fee}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faCalendarWeek} />
                        <div>
                            <h3>Number Of Week</h3>
                            <span>{classDt.numberOfWeek}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faPhone} />
                        <div>
                            <h3>Number Phone</h3>
                            <span>{classDt.numberPhone}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faFileLines} />
                        <div>
                            <h3>Description</h3>
                            <span>{classDt.description}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                        <div>
                            <h3>Create Date</h3>
                            <span>{classDt.createDate}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                        <div>
                            <h3>startDate</h3>
                            <span>{classDt.startDate}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                        <div>
                            <h3>endDate</h3>
                            <span>{classDt.endDate}</span>
                        </div>
                    </div>
                    <div className="val-box-btn">
                        <button className="btn btn-edit" onClick={() => setIsEditClassPopupVisible(true)}>
                            Edit class
                        </button>
                    </div>
                    <div className="val-box-btn">
                        <button className="btn btn-edit">
                            List Quizz
                        </button>
                    </div>
                    <div className="val-box-btn">
                        <button className="btn btn-edit">
                            Schedule
                        </button>
                    </div>
                </div>
            ) : (
                //<p>Loading class information...</p>
                <div className="conval">
                    <div className="values">
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} />
                            <div>
                                <h3>Class Name</h3>
                                <span>className</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faUser} />
                            <div>
                                <h3>Teacher Name</h3>
                                <span>teacherName</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faSchool} />
                            <div>
                                <h3>Course Name</h3>
                                <span>courseName</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} />
                            <div>
                                <h3>Number Student</h3>
                                <span>numberStudent</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faHashtag} />
                            <div>
                                <h3>Topic</h3>
                                <span>topic</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faMoneyCheckDollar} />
                            <div>
                                <h3>Fee</h3>
                                <span>fee</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faCalendarWeek} />
                            <div>
                                <h3>Number Of Week</h3>
                                <span>numberOfWeek</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faPhone} />
                            <div>
                                <h3>Number Phone</h3>
                                <span>numberPhone</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faFileLines} />
                            <div>
                                <h3>Description</h3>
                                <span>description</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                            <div>
                                <h3>Create Date</h3>
                                <span>createDate</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                            <div>
                                <h3>startDate</h3>
                                <span>startDate</span>
                            </div>
                        </div>
                        <div className="val-box">
                            <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                            <div>
                                <h3>endDate</h3>
                                <span>endDate</span>
                            </div>
                        </div>
                        <div className="val-box-btn">
                            <button className="btn btn-edit">
                                Edit class
                            </button>
                        </div>
                        <div className="val-box-btn">
                            <button className="btn btn-edit">
                                List Quizz
                            </button>
                        </div>
                        <div className="val-box-btn">
                            <button className="btn btn-edit" >
                                Schedule
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CardClass;