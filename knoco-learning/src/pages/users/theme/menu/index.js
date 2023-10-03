import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDashboard, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
const Menu = () => {
    return (
        <div className="items">
            <ul>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faDashboard} />
                    <Link className="link-a" to="DashboardPage">Dashboard</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faUser} />
                    <Link className="link-a" to="#">Account</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faCircleQuestion} />
                    <Link className="link-a" to="#">Repoort</Link>
                </li>
            </ul>
        </div>

    )
};

export default memo(Menu);