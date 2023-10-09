import React, { useEffect } from "react";
import { memo } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import CardClass from "../../components/detail/classDetail/CardClass";
import TableListLearnerInClass from "../../components/Table/TableListLearnerInClass";

const ClassDetail = ({ children, ...props }) => {
    useEffect(() => {
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function() {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
    }, []);

    const classDetails = {
        name: "G63",
        subject: "SEP490",
        member: "5",
        start: "01/09/2023",
        end: "30/12/2023"
    }
    return (
        <div className="body_page" {...props}>
            <section id="menu">
                <div className="logo">
                    <FontAwesomeIcon className="logo-icon" icon={faBook} />
                    <h1>Knoco</h1>
                </div>

                <nav>
                    <SideBar/>
                </nav>
            </section>

            <section id="interface">
                <header>
                    <Header/>
                </header>

                <div>
                    <CardClass classDt = {classDetails}/>
                    <TableListLearnerInClass/>
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );
};

export default memo(ClassDetail);