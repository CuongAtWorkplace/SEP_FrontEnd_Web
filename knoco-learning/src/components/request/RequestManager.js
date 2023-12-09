import React, { useEffect } from "react";
import { memo } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import SideBar from "../../components/sidebar/SideBar"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import TableListClassTeacher from "../../components/Table/TableListClassTeacher";
import TableRequestmanager from "./TableRequestmanager";
import $ from "jquery";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const RequestManager = ({ children, ...props }) => {
    const navigate = useNavigate();
    useEffect(() => {
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function() {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
        const token = localStorage.getItem("token");
        if (token !== null) {
            const decodedToken = jwtDecode(token);
           
            if (Number(decodedToken.roleid) !== 3 || localStorage.getItem("token") === '') {
                navigate(`/`);
            }
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
                    <SideBar/>
                </nav>
            </section>

            <section id="interface">
                <header>
                    <Header/>
                </header>

                <div className="children">
                    <TableRequestmanager/>
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );
};

export default memo(RequestManager);