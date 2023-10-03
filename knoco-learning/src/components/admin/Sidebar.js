import React, { useState } from 'react';
import '../../style/pages/admin.css';
import {FaUserAlt, FaShieldVirus, FaInfo, FaBars, FaChartBar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashborad",
            icon:<FaChartBar/>
        },
        {
            path: "/account",
            name: "Account",
            icon: <FaUserAlt/>
        },
        {
            path: "/report",
            name: "Report",
            icon: <FaShieldVirus/>
        },
        {
            path: "/about",
            name: "About",
            icon: <FaInfo/>
        },
    ]
    return (
        <div className='container'>
            <div style={{width: isOpen ? "200px" : "50px"}} className='sidebar'>
                <div className='top_section'>
                    <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>Knoco</h1>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className='bars'>
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className='link' activeclassName="active">
                            <div className='icon'>{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className='link_text'>{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;