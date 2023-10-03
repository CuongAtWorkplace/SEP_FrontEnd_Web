import React, { useEffect } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faChalkboard } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
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
                    <FontAwesomeIcon className="menu-icon" icon={faChalkboardUser} />
                    <Link className="link-a" to="#">Manage Courses</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faChalkboard} />
                    <Link className="link-a" to="#">View Schedule</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faListCheck} />
                    <Link className="link-a" to="#">Manage Teachers</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faCircleQuestion} />
                    <Link className="link-a" to="#">Manage Learners</Link>
                </li>
            </ul>
        </div>

    )
};

export default memo(ManagerMenu);