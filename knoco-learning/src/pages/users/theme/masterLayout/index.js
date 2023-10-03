import { memo } from "react";
//import React, { memo, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";
import "./style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const MasterLayout = ({ children, ...props }) => {
    return (
        <div className="body_page" {...props}>
            <section id="menu">
                <div className="logo">
                    <FontAwesomeIcon className="logo-icon" icon={faBook} />
                    <h1>Knoco</h1>
                </div>

                <nav>
                    <Menu />
                </nav>
            </section>

            <section id="interface">
                <header>
                    <Header />
                </header>

                <div>
                    {children}
                </div>

                <footer>
                    <Footer />
                </footer>
            </section>
        </ div>
    );

    // useEffect(() => {
    //     const handleMenuClick = () => {
    //         const menu = document.getElementById("menu");
    //         menu.classList.toggle("active");
    //     };

    //     const menuBtn = document.getElementById("menu-btn");
    //     menuBtn.addEventListener("click", handleMenuClick);

    //     const profileImg = document.querySelector('#interface .navigation .profile img');
    //     const dropdownMenu = document.getElementById('dropdown-menu');

    //     const toggleDropdown = () => {
    //         dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
    //     };

    //     profileImg.addEventListener('click', toggleDropdown);

    //     document.addEventListener('click', function(event) {
    //         if (!profileImg.contains(event.target)) {
    //             dropdownMenu.style.display = 'none';
    //         }
    //     });

    //     return () => {
    //         menuBtn.removeEventListener("click", handleMenuClick);
    //         profileImg.removeEventListener("click", toggleDropdown);
    //         document.removeEventListener("click", function(event) {
    //             if (!profileImg.contains(event.target)) {
    //                 dropdownMenu.style.display = 'none';
    //             }
    //         });
    //     };
    // }, []);
};

export default memo(MasterLayout);