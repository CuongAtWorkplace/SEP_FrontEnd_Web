import React, { useEffect, useState } from "react";
import { memo } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import CardClass from "../../components/detail/CardClass";
import TableListLearnerInClass from "../../components/Table/TableListLearnerInClass";
import CardEditClass from "../../components/edit/CardEditClass"
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const ClassDetail = ({ children, ...props }) => {
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
                    <CardClass />
                    <TableListLearnerInClass />
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );
};

export default memo(ClassDetail);