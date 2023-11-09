import React, { useState, useEffect } from "react";
import '../../style/Teacher/Teacher.css';
import myImage from '../../assets/profile.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"
import { faBook } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import CardEditProfile from "../../components/edit/CardEditProfile";
import CardChangePassword from "../../components/edit/CardChangePassword";
import CardChangeImage from "../../components/edit/CardChangeImage";

const ProfileTeacher = ({ onBackClick, children, ...props }) => {
    //const { userId } = props;
    const [teacherId, setClassDt] = useState(null);
    const [isEditClassPopupVisible, setEditClassPopupVisible] = useState(false);
    const [isChangePasswordPopupVisible, setChangePasswordPopupVisible] = useState(false);
    const [isChangeImagePopupVisible, setChangeImagePopupVisible] = useState(false);

    useEffect(() => {
        fetchData();
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetUserProfile/${2}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    const openEditClassPopup = () => {
        setEditClassPopupVisible(true);
    }

    const closeEditClassPopup = () => {
        setEditClassPopupVisible(false);
    }

    const openChangePasswordPopup = () => {
        setChangePasswordPopupVisible(true);
    }

    const closeChangePasswordPopup = () => {
        setChangePasswordPopupVisible(false);
    }

    const openChangeImagePopup = () => {
        setChangeImagePopupVisible(true);
    }

    const closeChangeImagePopup = () => {
        setChangeImagePopupVisible(false);
    }

    return (
        <div className="body_page" {...props}>
            <section id="menu">
                <div className="logo">
                    <FontAwesomeIcon className="logo-icon" icon={faBook} />
                    <h1>Knoco</h1>
                </div>

                <nav>
                    <SideBar />
                </nav>
            </section>

            <section id="interface">
                <header>
                    <Header />
                </header>

                <div className="children">
                    {teacherId ? (
                        <div className="containers">
                            <div className="profile-box">
                                <div className="col-1">
                                    <ul>
                                        <li>
                                            <img src={myImage} alt="Profile" />
                                        </li>
                                        <li>
                                            <button onClick={openChangeImagePopup}>Change image</button>
                                            <button onClick={openChangePasswordPopup}>Change password</button>
                                        </li>
                                        <li>
                                            <button onClick={onBackClick}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                                            <button onClick={openEditClassPopup}>Edit profile</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-2">
                                    <h2>{teacherId.fullName} </h2>
                                    <p className="title email">Email: </p>
                                    <p>{teacherId.email}</p>
                                    <p className="title phone">Phone number: </p>
                                    <p>{teacherId.phone}</p>
                                    <p className="title description">Description: </p>
                                    <p>{teacherId.description}</p>
                                    <p className="title address">Address: </p>
                                    <p>{teacherId.address}</p>
                                    <p className="title createdate">Create date: </p>
                                    <p>{formatDate(teacherId.createDate)}</p>
                                    <p className="title balance">Balance: </p>
                                    <p>{teacherId.balance}</p>

                                </div>
                            </div>
                        </div>
                    ) : (
                        // <p>Loading class information...</p>
                        <div className="containers">
                            <div className="profile-box">
                                <div className="col-1">
                                    <ul>
                                        <li>
                                            <img src={myImage} alt="Profile" />
                                        </li>
                                        <li>
                                            <button onClick={openChangeImagePopup}>Change image</button>
                                            <button onClick={openChangePasswordPopup}>Change password</button>
                                        </li>
                                        <li>
                                            <button onClick={onBackClick}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                                            <button onClick={openEditClassPopup}>Edit profile</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-2">
                                    <h2>null</h2>
                                    <p className="title">Email: </p>
                                    <p>null</p>
                                    <p className="title">Phone number: </p>
                                    <p>null</p>
                                    <p className="title">Description: </p>
                                    <p>null</p>
                                    <p className="title">Address: </p>
                                    <p>null</p>

                                </div>
                            </div>
                        </div>
                    )}

                    {isEditClassPopupVisible && (
                        <div className="popup">
                            <CardEditProfile closePopup={closeEditClassPopup} />
                        </div>
                    )}

                    {isChangePasswordPopupVisible && (
                        <div className="popup">
                            <CardChangePassword closePopup={closeChangePasswordPopup} />
                        </div>
                    )}

                    {isChangeImagePopupVisible && (
                        <div className="popup">
                            <CardChangeImage closePopup={closeChangeImagePopup} />
                        </div>
                    )}
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );
}

export default memo(ProfileTeacher);