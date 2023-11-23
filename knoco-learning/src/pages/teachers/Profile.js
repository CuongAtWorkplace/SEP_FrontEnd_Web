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
    const UserID = 2;
    const [userDt, setUserDt] = useState(null);
    const [isEditProfilePopupVisible, setEditProfilePopupVisible] = useState(false);
    const [isChangePasswordPopupVisible, setChangePasswordPopupVisible] = useState(false);
    const [isChangeImagePopupVisible, setChangeImagePopupVisible] = useState(false);
    const [imageSource, setImageSource] = useState("");

    useEffect(() => {
        fetchData();
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
        fetchImage();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetUserProfile/${UserID}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setUserDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const fetchImage = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetUserImage/GetImage/${UserID}`);
            if (response.ok) {
                const imageData = await response.blob();
                setImageSource(URL.createObjectURL(imageData));
            }
        } catch (error) {
            console.error('Lỗi khi lấy ảnh:', error);
        }
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    const openEditProfilePopup = () => {
        setEditProfilePopupVisible(true);
    }

    const closeEditProfilePopup = () => {
        setEditProfilePopupVisible(false);
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
                    {userDt ? (
                        <div className="containers">
                            <div className="profile-box">
                                <div className="colums-1">
                                    <ul className="imgbtn-profile">
                                        <li>
                                            <img src={imageSource || myImage} alt={userDt.image || "Profile"} />
                                        </li>
                                        <li>
                                            <button onClick={openChangeImagePopup}>Change image</button>
                                            <button onClick={openChangePasswordPopup}>Change password</button>
                                        </li>
                                        <li>
                                            <button onClick={onBackClick}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                                            <button onClick={openEditProfilePopup}>Edit profile</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="colums-2">
                                    <h2>{userDt.fullName} </h2>
                                    <p className="title email">Email: </p>
                                    <p>{userDt.email}</p>
                                    <p className="title phone">Phone number: </p>
                                    <p>{userDt.phone}</p>
                                    <p className="title description">Description: </p>
                                    <p>{userDt.description}</p>
                                    <p className="title address">Address: </p>
                                    <p>{userDt.address}</p>
                                    <p className="title createdate">Create date: </p>
                                    <p>{formatDate(userDt.createDate)}</p>
                                    <p className="title balance">Balance: </p>
                                    <p>{userDt.balance}</p>

                                </div>
                            </div>
                        </div>
                    ) : (
                        // <p>Loading class information...</p>
                        <div className="containers">
                            <div className="profile-box">
                                <div className="colums-1">
                                    <ul className="imgbtn-profile">
                                        <li>
                                            <img src={myImage} alt="Profile" />
                                        </li>
                                        <li>
                                            <button onClick={openChangeImagePopup}>Change image</button>
                                            <button onClick={openChangePasswordPopup}>Change password</button>
                                        </li>
                                        <li>
                                            <button onClick={onBackClick}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                                            <button onClick={openEditProfilePopup}>Edit profile</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="colums-2">
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

                    {isEditProfilePopupVisible && (
                        <div className="popup">
                            <CardEditProfile closePopup={closeEditProfilePopup} />
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