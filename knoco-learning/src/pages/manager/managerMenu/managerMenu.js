import React, { useEffect } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool,
        faCalendarDays,
        faChalkboardTeacher,
        faUser,
        faFlag,
        faClipboard,
        faComment,
        faGear } from '@fortawesome/free-solid-svg-icons';
import $ from "jquery";
const ManagerMenu = () => {
    useEffect(() => {
        $(document).ready(function() {
            $('#menu-btn').click(function() {
                $('#menu').toggleClass("active");
            });
        });
    }, []);
    return (
        <div className="items">
            <ul>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faSchool} />
                    <Link className="link-a" to="#">Manage Courses</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                    <Link className="link-a" to="#">View Schedule</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faChalkboardTeacher} />
                    <Link className="link-a" to="#">Manage Teachers</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faUser} />
                    <Link className="link-a" to="#">Manage Learners</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faFlag} />
                    <Link className="link-a" to="#">View Reports</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faClipboard} />
                    <Link className="link-a" to="#">Manage Posts</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faComment} />
                    <Link className="link-a" to="#">Manage Comments</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faGear} />
                    <Link className="link-a" to="#">Settings</Link>
                </li>
            </ul>
        </div>

    )
};

export default memo(ManagerMenu);