import { useState } from "react";
import { memo } from "react";
//import React, { memo, useEffect } from "react";
//import Header from "../header";
import { Link } from "react-router-dom";
import Footer from "../footer";
import Menu from "../menu";
import "./style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const MasterLayout = ({ children, ...props }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };
    
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
                
                    <div className="navigation">
                        <div className="n1">
                            <div>
                                <FontAwesomeIcon id="menu-btn" icon={faBars} />
                            </div>
                            <div className="pape-h2">
                                <h2>Home</h2>
                            </div>
                            <div className="search">
                                <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
                                <input type="text" placeholder="Search" />
                             </div>
                        </div>

                        <div className="profile">
                            <FontAwesomeIcon className="icon-profile" icon={faBell} />
                            <FontAwesomeIcon className="icon-img" icon={faChalkboardUser} onClick={toggleDropdown}/>
                            <div className={`dropdown-menu ${isDropdownVisible ? "active" : ""}`} id="dropdown-menu">
                                <ul>
                                    <li><Link className="link-a" to="#">Change Password</Link></li>
                                    <li><Link className="link-a" to="#">Log Out</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                

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