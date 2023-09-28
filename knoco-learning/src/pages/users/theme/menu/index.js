import { memo } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faChalkboard } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
const Menu = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link className="link-a" to="#">
                    <FontAwesomeIcon className="menu-icon" icon={faChalkboardUser} />
                    Class List
                </Link></li>
                <li><Link className="link-a" to="#">
                <FontAwesomeIcon className="menu-icon" icon={faChalkboard} />
                    Empty Class
                </Link></li>
                <li><Link className="link-a" to="#">
                <FontAwesomeIcon className="menu-icon" icon={faListCheck} />
                    Quiz List
                </Link></li>
                <li><Link className="link-a" to="#">
                <FontAwesomeIcon className="menu-icon" icon={faCircleQuestion} />
                    Manager Help
                </Link></li>
            </ul>
        </div>

    )
};

export default memo(Menu);