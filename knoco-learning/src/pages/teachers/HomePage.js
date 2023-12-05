import React, { useEffect, useState } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"
import "../../style/Teacher/Homepage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const HomePage = ({ children, ...props }) => {
    const [dataClass, setDataClass] = useState([]);
    const [dataCourse, setDataCourse] = useState([]);
    useEffect(() => {
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
        fetchDataClass();
        fetchDataCourse();
    }, []);

    const fetchDataClass = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Class/GetTopClassByDate`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setDataClass(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const fetchDataCourse = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Course/GetTopCourseByDate`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setDataCourse(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    function formatAPIDate(apiDate) {
        return new Date(apiDate).toLocaleDateString('en-US');
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
                    <h3 className="i-name">
                        New course
                    </h3>
                    <div className="home-course" id="courseContainer">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {dataCourse.length > 0 ? (
                                dataCourse.map((courseC, indexCourse) => (
                                    <SwiperSlide>
                                        <div className="item-course">
                                            <div className="div-img">
                                                <img src={`https://localhost:7169/Photos/${courseC.image}` || "https://reactjs.org/logo-og.png"} alt={courseC.courseName} />
                                            </div>
                                            <div class="item-infomation">
                                                <div class="d-flex">
                                                    <small><i class="text-primary"></i>{formatAPIDate(courseC.createDate)}</small>
                                                    <small><i class="text-primary"></i>01h 30m</small>
                                                </div>
                                                <Link class="a-link" to={`/coursedetail/${courseC.courseId}`}>{courseC.courseName}</Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <p>Loading class information...</p>
                            )}
                        </Swiper>
                    </div>

                    <h3 className="i-name-2">
                        New class
                    </h3>

                    <div className="home-course">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {dataClass.length > 0 ? (
                                dataClass.map((classC, indexClass) => (
                                    <SwiperSlide>
                                        <div className="item-course">
                                        <div className="div-img">
                                                <img src={`https://localhost:7169/Photos/${classC.image}` || "https://reactjs.org/logo-og.png"} alt={classC.className} />
                                            </div>
                                            <div class="item-infomation">
                                                <div class="d-flex">
                                                    <small><i class="text-primary"></i>{classC.numberStudent} Students</small>
                                                    <small><i class="text-primary"></i>{classC.schedule}</small>
                                                </div>
                                                <Link class="a-link" to={`/classdetail/${classC.classId}`}>{classC.className}</Link>
                                                <div class="border-top">
                                                    <div class="d-flex m-0">
                                                        <h5><i class="text-primary"></i>{classC.numberOfWeek} Week</h5>
                                                        <h5><i class="text-primary"></i>{classC.fee} Coin</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <p>Loading class information...</p>
                            )}
                        </Swiper>
                    </div>
                </div>

                <footer className="footer">
                    <Footer />
                </footer>
            </section >
        </ div >
    );
};

export default memo(HomePage);