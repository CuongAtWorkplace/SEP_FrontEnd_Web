import React, { useEffect } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import {
    faSchool,
    faChalkboardTeacher,
    faUser,
    faFlag,
    faClipboard,
    faDashboard,
    faChalkboardUser,
    faCheckToSlot,
    faUserGraduate
} from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
import { useState } from "react";
import { Route, Redirect } from 'react-router-dom';
import ViewAllCourse from "../../pages/manager/Course/ViewAllCourse";
import ViewPostListManager from "../../pages/manager/ViewPostListManager";
import TableListClassTeacher from "../Table/TableListClassTeacher";
import jwtDecode from "jwt-decode";
import './SideBar.css'
const SideBar = () => {
    const navigate = useNavigate();
    const [roleid, setRoleid] = useState('');
    const [tokenCheck, setToken] = useState('');

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            setRoleid(decodedToken.roleid);
            // setTimeout(() => {
            //     localStorage.removeItem('token');
            //     console.log('da xoa token.');
            //     console.log(token)
            // }, 60 * 1000);
            // if (Number(decodedToken.roleid) === 2 || localStorage.getItem("token") === '') {
            //     navigate(`/`);
            // }
        } else {
            navigate(`/`);
        }
    }, []);

    return (

        <div className="items">
            <div>
                <ul>
                    {/*Admin */}
                    {roleid == '4' && <>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faDashboard} />
                            <Link className="link-a" to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faUser} />
                            <Link className="link-a" to="/users">User Manage</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faFlag} />
                            <Link className="link-a" to="/report">Report</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faSchool} />
                            <Link className="link-a" to="/viewallclass">Class List</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faSchool} />
                            <Link className="link-a" to="/viewallpost">Post List</Link>
                        </li>
                    </>}

                    {/*Manage */}
                    {roleid == '3' && <>
                       
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faDashboard} />
                            <Link className="link-a" to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faSchool} />
                            <Link className="link-a" to="/manager/course">Manage Courses</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faClipboard} />
                            <Link className="link-a" to="/manager/viewpostlistmanager">Manage Posts</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faChalkboardTeacher} />
                            <Link className="link-a" to="/viewallclass">Manage Class</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faUser} />
                            <Link className="link-a" to="">Manage Learners</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faFlag} />
                            <Link className="link-a" to="/tableRequesClassmanager">View Request Class</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faFlag} />
                            <Link className="link-a" to="/tableRequestmanager">View Request User</Link>
                        </li>
                    </>}

                    {/*Teacher */}
                    {roleid == '1' && <>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faChalkboardUser} />
                            <Link className="link-a" to="/viewclass">View Class</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faCheckToSlot} />
                            <Link className="link-a" to="/list-all-course">Choose class</Link>
                        </li>
                        <li>
                            <FontAwesomeIcon className="menu-icon" icon={faUserGraduate} />
                            <Link className="link-a" to="/profile-teacher">Profile</Link>
                        </li>
                    </>}
                </ul>
            </div>


        </div>

    )
};

export default memo(SideBar);