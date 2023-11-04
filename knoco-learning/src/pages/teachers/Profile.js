import React, { useState, useEffect } from "react";
import '../../style/Teacher/Teacher.css';
import "./style.css";
import myImage from '../../assets/profile.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"
import { faBook } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";

const ProfileTeacher = ({ onBackClick, children, ...props }) => {
    const { userId } = props;
    const [teacherId, setClassDt] = useState(null);

    useEffect(() => {
        fetchData();
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetStudentDetailInClass/${2}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
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
                    {teacherId ? (
                        <div className="containers">
                            <div className="profile-box">
                                <div className="col-1">
                                    <ul>
                                        <li>
                                            <img src={myImage} alt="Profile" />
                                        </li>
                                        <li>
                                            <button>Edit</button>
                                            <button>Change password</button>
                                        </li>
                                        <li>
                                            <button onClick={onBackClick}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-2">
                                    <h2>{teacherId.fullName} </h2>
                                    <p className="email">Email: </p>
                                    <p>{teacherId.email}</p>
                                    <p className="phone">Phone number: </p>
                                    <p>{teacherId.phone}</p>
                                    <p className="description">Description: </p>
                                    <p>{teacherId.description}</p>
                                    <p className="address">Address: </p>
                                    <p>{teacherId.address}</p>
                                    <p className="createdate">Create date: </p>
                                    <p>{teacherId.createDate}</p>
                                    <p className="balance">Balance: </p>
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
                                            <button>Edit</button>
                                            <button>Change password</button>
                                        </li>
                                        <li>
                                            <button onClick={onBackClick}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
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
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );
}

export default memo(ProfileTeacher);