import React, { useState, useEffect } from "react";
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faPeopleGroup,
    faCalendarDays
} from '@fortawesome/free-solid-svg-icons';

const CardClass = (props) => {
    const { classId } = props;
    const [classDt, setClassDt] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Class/GetClassToTeacherById/${1}`); // Thay thế URL bằng API thực tế
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
                        <FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} />
                        <div>
                            <h3>Teacher Name</h3>
                            <span>{classDt.teacherName}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} />
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
                        <FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} />
                        <div>
                            <h3>Topic</h3>
                            <span>{classDt.topic}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} />
                        <div>
                            <h3>Quizze Name</h3>
                            <span>{classDt.quizzeName}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} />
                        <div>
                            <h3>Schedule</h3>
                            <span>{classDt.schedule}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faUser} />
                        <div>
                            <h3>Fee</h3>
                            <span>{classDt.fee}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                        <div>
                            <h3>Number Of Week</h3>
                            <span>{classDt.numberOfWeek}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                        <div>
                            <h3>Number Phone</h3>
                            <span>{classDt.numberPhone}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
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
                            <span>endDate{classDt.endDate}</span>
                        </div>
                    </div>
                    <div>
                        <button className="btn-edit">
                            Edit class
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading class information...</p>
            )}
        </div>
    );
}

export default CardClass;