import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import CardNote from "../../edit/CardNote";

const CardClass = ({ setIsEditClassPopupVisible }) => {
    const [classDt, setClassDt] = useState(null);
    const params = useParams();
    const [isNotePopupVisible, setNotePopupVisible] = useState(false);
    const navigate = useNavigate();
    const [className, setClassName] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Class/GetTeacherClassDetail/${params.classId}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
            setClassName(responseData.className);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    const handleQuizzClick = () => {
        console.log("Button quizz clicked!");
        navigate(`/listquizzinclass`);
    }

    const openNotePopup = () => {
        setNotePopupVisible(true);
    }

    const closeNotePopup = () => {
        setNotePopupVisible(false);
    }

    return (
        <div className="conval">
            {classDt ? (
                <div className="class-detail">
                    <div className="val-box">
                        <div>
                            <h2><FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} /> Class: {classDt.className}</h2>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faUser} /> Teacher name</h3>
                            <span>{classDt.teacherName}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faSchool} /> Course name</h3>
                            <span>{classDt.courseName}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} /> Number student</h3>
                            <span>{classDt.numberStudent}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faHashtag} /> Topic</h3>
                            <span>{classDt.topic}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faMoneyCheckDollar} /> Fee</h3>
                            <span>{classDt.fee}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarWeek} /> Number of week</h3>
                            <span>{classDt.numberOfWeek}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faPhone} /> Number phone</h3>
                            <span>{classDt.numberPhone}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faFileLines} /> Description</h3>
                            <span>{classDt.description}</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarDays} /> Create date</h3>
                            {/* <span>{formatDate(classDt.createDate)}</span> */}
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarDays} /> Start date</h3>
                            {/* <span>{formatDate(classDt.startDate)}</span> */}
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarDays} /> End date</h3>
                            {/* <span>{formatDate(classDt.endDate)}</span> */}
                        </div>
                    </div>
                    <div className="val-box-btn">
                        <button className="btn-item" onClick={() => setIsEditClassPopupVisible(true)}>
                            Edit class
                        </button>

                        <a href={`/videocalldemo/${classDt.className}`}>
                            <button className="btn-item" >
                                Meeting Room
                            </button>
                        </a>

                        <button className="btn-item" onClick={openNotePopup}>
                            Note box
                        </button>
                    </div>
                </div>
            ) : (
                <div className="class-detail">
                    <div className="val-box">
                        <div>
                            <h2><FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} /> Class name: Class name</h2>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faUser} /> Teacher name</h3>
                            <span>Teacher name</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faSchool} /> Course name</h3>
                            <span>Course name</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} /> Number student</h3>
                            <span>Number student</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faHashtag} /> Topic</h3>
                            <span>Topic</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faMoneyCheckDollar} /> Fee</h3>
                            <span>Fee</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarWeek} /> Number of week</h3>
                            <span>Number of week</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faPhone} /> Number phone</h3>
                            <span>Number phone</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faFileLines} /> Description</h3>
                            <span>Description</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarDays} /> Create date</h3>
                            <span>Create date</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarDays} /> Start date</h3>
                            <span>Start date</span>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarDays} /> End date</h3>
                            <span>End date</span>
                        </div>
                    </div>
                    <div className="val-box-btn">
                        <button className="btn-item" onClick={() => setIsEditClassPopupVisible(true)}>
                            Edit class
                        </button>

                        <a >
                            <button className="btn-item" >
                                Meeting Room
                            </button>
                        </a>
                        <button className="btn-item" onClick={openNotePopup}>
                            Note box
                        </button>
                    </div>
                </div>
            )}
            {isNotePopupVisible && (
                <div className="popup">
                    <CardNote closePopup={closeNotePopup} />
                </div>
            )}
        </div>
    );
}

export default CardClass;