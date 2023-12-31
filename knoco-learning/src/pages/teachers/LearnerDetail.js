import React, { useEffect } from "react";
import { memo } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import CardLearner from "../../components/detail/learnerDetail/CardLearner";
import $ from "jquery";
import { API_BASE_URL } from "../../paths";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const LearnerDetail = ({ children, ...props }) => {
    const navigate = useNavigate();
    useEffect(() => {
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
        const token = localStorage.getItem("token");
        if (token !== null) {
            const decodedToken = jwtDecode(token);

            if (Number(decodedToken.roleid) === 1 || localStorage.getItem("token") === '') {

            } else {
                navigate(`/`);
            }
        } else {
            navigate(`/`);
        }
    }, []);

    const learnerDetails = {
        name: "Le Quang Huy",
        email: "john.doe@example.com",
        profileImage: "../../components/detail/learnerDetail/profile.jpg",
        gender: "Male",
        phone: "0977935037"
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

                <div>
                    <CardLearner learner={learnerDetails} />
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );
};

export default memo(LearnerDetail);