import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBeer, faDashboard, faUser } from '@fortawesome/free-solid-svg-icons';
// import { faChalkboard } from '@fortawesome/free-solid-svg-icons';
// import { faListCheck } from '@fortawesome/free-solid-svg-icons';
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
                    <Link className="link-a" to="#">Repoort Form Manager</Link>
                </li>
                {/* <li>
                    <FontAwesomeIcon className="menu-icon" icon={faCircleQuestion} />
                    <Link className="link-a" to="#">Manager Help</Link>
                </li> */}
            </ul>
        </div>

    )
};

export default memo(Menu);