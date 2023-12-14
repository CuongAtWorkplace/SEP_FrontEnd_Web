import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../../style/Teacher/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faFileLines,
    faUsersLine,
    faPersonChalkboard,
    faBookOpenReader,
    faListOl,
    faLightbulb,
    faCoins,
    faCalendarDay,
    faCalendarPlus,
    faCalendarCheck,
    faCalendarXmark,
    faPenToSquare,
    faVideo,
    faNoteSticky,
    faMessage,
    faClock
} from '@fortawesome/free-solid-svg-icons';
import CardNote from "../edit/CardNote";
import { API_BASE_URL } from "../../paths";
import CardEditClass from "../edit/CardEditClass";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";


const CardClass = () => {
    const [classDt, setClassDt] = useState(null);
    const params = useParams();
    const [isNotePopupVisible, setNotePopupVisible] = useState(false);
    const navigate = useNavigate();
    const [className, setClassName] = useState('');
    const [isEditClassPopupVisible, setIsEditClassPopupVisible] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const [checkToken, setcheckToken] = useState(false);

    useEffect(() => {
        fetchData();
        fetchCheckUser();
    }, [reloadData]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/Class/GetTeacherClassDetail/${params.classId}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
            setClassName(responseData.className);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const fetchCheckUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const decodedToken = jwtDecode(token);
            const response = await fetch(`${API_BASE_URL}/api/Class/CheckTeacherFromClass?userId=${decodedToken.userid}&classId=${params.classId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setcheckToken(true);
            } else {
                setcheckToken(false);
                toast.success("The teacher is not present in class!")
                console.log("k co quyen");
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    function formatAPIDate(apiDate) {
        return new Date(apiDate).toLocaleDateString('en-US');
    }

    const openNotePopup = () => {
        setNotePopupVisible(true);
    }

    const closeNotePopup = () => {
        setNotePopupVisible(false);
    }

    const handleMeetingClick = () => {
        navigate(`/videocall/${classDt.className}`); // Chuyển hướng đến trang /videocall khi nhấp vào nút "Meeting"
    };

    const handleChatClick = () => {
        navigate(`/chat/${classDt.classId}`); // Chuyển hướng đến trang /videocall khi nhấp vào nút "Meeting"
    };

    const openEditClassPopup = () => {
        setIsEditClassPopupVisible(true);
    };

    const closeEditClassPopup = async () => {
        setIsEditClassPopupVisible(false);
        setReloadData(!reloadData);
        try {
            await fetchData(); // Fetch dữ liệu mới sau khi đóng popup chỉnh sửa
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu sau khi chỉnh sửa:', error);
        }
    };

    return (
        <div className="conval">
            {checkToken === true && classDt ? (
                <div className="class-detail">
                    <div className="val-box">
                        <div>
                            <h2><FontAwesomeIcon className="menu-icon" icon={faUsersLine} /> Class: {classDt.className || "Empty!"}</h2>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faPersonChalkboard} /> Teacher: <span>{classDt.teacherName || "Empty!"}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faBookOpenReader} /> Course: <span>{classDt.courseName || "Empty!"}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faListOl} /> Number student: <span>{classDt.numberStudent || "Empty!"}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faLightbulb} /> Topic: <span>{classDt.topic || "Empty!"}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faClock} /> Schedule: <span>{classDt.schedule || "Empty!"}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCoins} /> Fee: <span>{classDt.fee || "Empty!"}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarDay} /> Number in week: <span>{classDt.numberOfWeek || "Empty!"}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faPhone} /> Number phone: <span>{classDt.numberPhone || "Empty!"}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faFileLines} /> Description: <span>{classDt.description || "Empty!"}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarPlus} /> Create date: <span>{formatAPIDate(classDt.createDate || "Empty!")}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarCheck} /> Start date: <span>{formatAPIDate(classDt.startDate || "Empty!")}</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarXmark} /> End date: <span>{formatAPIDate(classDt.endDate || "Empty!")}</span></h3>
                        </div>
                    </div>
                    <div className="val-box-btn">
                        <button className="btn-item" onClick={openEditClassPopup}>
                            <FontAwesomeIcon icon={faPenToSquare} /> Edit
                        </button>

                        <button className="btn-item" onClick={handleMeetingClick}>
                            <FontAwesomeIcon icon={faVideo} /> Meeting
                        </button>

                        <button className="btn-item" onClick={handleChatClick}>
                            <FontAwesomeIcon icon={faMessage} /> Chat
                        </button>

                        <button className="btn-item" onClick={openNotePopup}>
                            <FontAwesomeIcon icon={faNoteSticky} /> Note
                        </button>
                    </div>
                </div>
            ) : (
                <div className="class-detail">
                    <div className="val-box">
                        <div>
                            <h2><FontAwesomeIcon className="menu-icon" icon={faUsersLine} /> Class: Empty!</h2>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faPersonChalkboard} /> Teacher: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faBookOpenReader} /> Course: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faListOl} /> Number student: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faLightbulb} /> Topic: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCoins} /> Fee: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarDay} /> Number in week: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faPhone} /> Number phone: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faFileLines} /> Description: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarPlus} /> Create date: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarCheck} /> Start date: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box">
                        <div>
                            <h3><FontAwesomeIcon className="menu-icon" icon={faCalendarXmark} /> End date: <span>Empty!</span></h3>
                        </div>
                    </div>
                    <div className="val-box-btn">
                        <button className="btn-item" onClick={openEditClassPopup}>
                            <FontAwesomeIcon icon={faPenToSquare} /> Edit
                        </button>

                        <button className="btn-item" onClick={handleMeetingClick}>
                            <FontAwesomeIcon icon={faVideo} /> Meeting
                        </button>

                        <button className="btn-item" onClick={handleChatClick}>
                            <FontAwesomeIcon icon={faMessage} /> Chat
                        </button>

                        <button className="btn-item" onClick={openNotePopup}>
                            <FontAwesomeIcon icon={faNoteSticky} /> Note
                        </button>
                    </div>
                </div>
            )}

            {isNotePopupVisible && (
                <div className="popup">
                    <CardNote closePopup={closeNotePopup} />
                </div>
            )}

            {isEditClassPopupVisible && (
                <div className="popup">
                    <CardEditClass closePopup={closeEditClassPopup} />
                </div>
            )}
        </div>
    );
}

export default CardClass;