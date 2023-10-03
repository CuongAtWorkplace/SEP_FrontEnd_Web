import React, { useState } from 'react';
import '../../style/pages/admin.css';
import { FaUserAlt, FaShieldVirus, FaInfo, FaBars, FaChartBar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { BsGrid1X2Fill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, Bs0Circle, BsPersonFill }
    from 'react-icons/bs'

const Sidebar = ({ children }, { openSidebarToggle, OpenSidebar }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Dashborad",
            icon: <FaChartBar />
        },
        {
            path: "/account",
            name: "Account",
            icon: <FaUserAlt />
        },
        {
            path: "/report",
            name: "Report",
            icon: <FaShieldVirus />
        },
        {
            path: "/about",
            name: "About",
            icon: <FaInfo />
        },
    ]
    return (
        <div className='container'>
            <div style={{width: isOpen ? "220px" : "50px"}} className='sidebar'>
                <div className='top_section'>
                    <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>Knoco</h1>
                    {/* <span className='icon close_icon' onClick={OpenSidebar}>X</span> */}
                    <div style={{marginLeft: isOpen ? "100px" : "0px"}} className='bars'>
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
    <div className='children'>{children}</div>
        </div>
    // return (
    //     <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
    //         <div className='sidebar-title'>
    //             <div className='sidebar-brand'>
    //                 <h1 className='logo'>Knoco</h1>
    //                 {/* <Bs0Circle className='icon_header' /> Knoco */}
    //             </div>
    //             <span className='icon close_icon' onClick={OpenSidebar}>X</span>
    //         </div>

    //         <ul className='sidebar-list'>
    //             <li className='sidebar-list-item'>
    //                 <a href="">
    //                     <BsGrid1X2Fill className='icon' /> Dashboard
    //                 </a>
    //             </li>
    //             <li className='sidebar-list-item'>
    //                 <a href="">
    //                     <BsPersonFill className='icon' /> Account
    //                 </a>
    //             </li>
    //             <li className='sidebar-list-item'>
    //                 <a href="">
    //                     <BsListCheck className='icon' /> Inventory
    //                 </a>
    //             </li>
    //             <li className='sidebar-list-item'>
    //                 <a href="">
    //                     <BsMenuButtonWideFill className='icon' /> Reports
    //                 </a>
    //             </li>
    //             <li className='sidebar-list-item'>
    //                 <a href="">
    //                     <BsFillGearFill className='icon' /> Setting
    //                 </a>
    //             </li>
    //         </ul>
    //     </aside>
    );
};

export default Sidebar;