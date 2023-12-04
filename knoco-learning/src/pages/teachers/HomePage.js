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
    const [data, setData] = useState([]);

    useEffect(() => {
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
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
                        New Course
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
                            {data.length > 0 ? (
                                data.map((course, index) => (
                                    <SwiperSlide>
                                        <div className="item-course">
                                            <img src="https://reactjs.org/logo-og.png" alt="react logo" />
                                            <div class="item-infomation">
                                                <div class="d-flex">
                                                    <small><i class="text-primary"></i>25 Students</small>
                                                    <small><i class="text-primary"></i>01h 30m</small>
                                                </div>
                                                <Link class="a-link" href="">Web design & development courses for beginner 1</Link>
                                                <div class="border-top">
                                                    <div class="d-flex m-0">
                                                        <h5><i class="text-primary"></i>4.5 <small>(250)</small></h5>
                                                        <h5><i class="text-primary"></i>$99</h5>
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

                    <h3 className="i-name-2">
                        Hot Course
                    </h3>

                    <div className="home-course">
                        
                    </div>
                </div>

                <footer>
                    <Footer />
                </footer>
            </section >
        </ div >
    );
};

export default memo(HomePage);