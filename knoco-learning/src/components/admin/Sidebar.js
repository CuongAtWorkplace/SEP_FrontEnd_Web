import React, { Children } from 'react';
import '../../style/pages/admin.css';
import {FaUserAlt, FaShieldVirus, FaInfo, FaBars, FaChartBar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = ({children}) => {
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
            <div className='sidebar'>
                <div className='top_section'>
                    <h1 className='logo'>Knoco</h1>
                    <div className='bars'>
                        <FaBars/>
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className='link'>
                            <div className='icon'>{item.icon}</div>
                            <div className='link_text'>{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;