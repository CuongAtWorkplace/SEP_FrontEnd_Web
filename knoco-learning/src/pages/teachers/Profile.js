import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/Teacher/Teacher.css';
import myImage from '../../assets/profile.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUserGraduate, faEnvelope, faSquarePhone, faPen, faMapLocationDot, faCalendarDays, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"
import { faBook } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import CardEditProfile from "../../components/edit/CardEditProfile";
import CardChangePassword from "../../components/edit/CardChangePassword";
import CardChangeImage from "../../components/edit/CardChangeImage";
import { API_BASE_URL } from "../../paths";
import jwtDecode from "jwt-decode";
const ProfileTeacher = ({ onBackClick, children, ...props }) => {
    const navigate = useNavigate();
    const [userDt, setUserDt] = useState(null);
    const [isEditProfilePopupVisible, setEditProfilePopupVisible] = useState(false);
    const [isChangePasswordPopupVisible, setChangePasswordPopupVisible] = useState(false);
    const [isChangeImagePopupVisible, setChangeImagePopupVisible] = useState(false);
    const [imageSource, setImageSource] = useState("");
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null) {
            const decodedToken = jwtDecode(token);
           
            if (Number(decodedToken.roleid) !== 1 || localStorage.getItem("token") === '') {
                navigate(`/`);
            }
        }

        fetchData();
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
        fetchImage();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const response = await fetch(`${API_BASE_URL}/api/User/GetUserProfile/${decodedToken.userid}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setUserDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const fetchImage = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const response = await fetch(`${API_BASE_URL}/api/User/GetUserImage/GetImage/${decodedToken.userid}`);
            if (response.ok) {
                const imageData = await response.blob();
                setImageSource(URL.createObjectURL(imageData));
            }
        } catch (error) {
            console.error('Lỗi khi lấy ảnh:', error);
        }
    };

    function formatAPIDate(apiDate) {
        return new Date(apiDate).toLocaleDateString('en-US');
    }

    const openEditProfilePopup = () => {
        setEditProfilePopupVisible(true);
    }

    const closeEditProfilePopup = async () => {
        setEditProfilePopupVisible(false);
        setReloadData(!reloadData);
        try {
            await fetchData(); // Fetch dữ liệu mới sau khi đóng popup chỉnh sửa
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu sau khi chỉnh sửa:', error);
        }
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

    const handleLogoutClick = () => {
        navigate(`/login`); // Chuyển hướng đến trang /videocall khi nhấp vào nút "Meeting"
    };

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
                                            <button onClick={openEditProfilePopup}>Edit profile</button>
                                        </li>
                                        <li>
                                            <button onClick={openChangePasswordPopup}> Change password</button>
                                            <button onClick={handleLogoutClick}><FontAwesomeIcon icon={faRightFromBracket} /> Log out</button>

                                        </li>
                                    </ul>
                                </div>
                                <div className="colums-2">
                                    <h2><FontAwesomeIcon icon={faUserGraduate} /> {userDt.fullName} </h2>
                                    <h4 className="title email"><FontAwesomeIcon icon={faEnvelope} /> Email: </h4>
                                    <p>{userDt.email}</p>
                                    <h4 className="title phone"><FontAwesomeIcon icon={faSquarePhone} /> Phone number: </h4>
                                    <p>{userDt.phone}</p>
                                    <h4 className="title description"><FontAwesomeIcon icon={faPen} /> Description: </h4>
                                    <p>{userDt.description}</p>
                                    <h4 className="title address"><FontAwesomeIcon icon={faMapLocationDot} /> Address: </h4>
                                    <p>{userDt.address}</p>
                                    <h4 className="title createdate"><FontAwesomeIcon icon={faCalendarDays} /> Create date: </h4>
                                    <p>{formatAPIDate(userDt.createDate)}</p>
                                    <h4 className="title balance"><FontAwesomeIcon icon={faMoneyCheckDollar} /> Balance: </h4>
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
                                            <button onClick={openChangeImagePopup}>Change avatar</button>
                                            <button onClick={openEditProfilePopup}>Edit profile</button>
                                        </li>
                                        <li>
                                            <button onClick={openChangePasswordPopup}>Change password</button>
                                            <button onClick={handleLogoutClick}><FontAwesomeIcon icon={faRightFromBracket} /> Log out</button>

                                        </li>
                                    </ul>
                                </div>
                                <div className="colums-2">
                                    <h2>null</h2>
                                    <h4 className="title email"><FontAwesomeIcon icon={faEnvelope} /> Email: </h4>
                                    <p>Empty!</p>
                                    <h4 className="title phone"><FontAwesomeIcon icon={faSquarePhone} /> Phone number: </h4>
                                    <p>Empty!</p>
                                    <h4 className="title description"><FontAwesomeIcon icon={faPen} /> Description: </h4>
                                    <p>Empty!</p>
                                    <h4 className="title address"><FontAwesomeIcon icon={faMapLocationDot} /> Address: </h4>
                                    <p>Empty!</p>
                                    <h4 className="title createdate"><FontAwesomeIcon icon={faCalendarDays} /> Create date: </h4>
                                    <p>Empty!</p>
                                    <h4 className="title balance"><FontAwesomeIcon icon={faMoneyCheckDollar} /> Balance: </h4>
                                    <p>Empty!</p>
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