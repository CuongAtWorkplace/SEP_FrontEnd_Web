import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faChalkboard } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
const Menu = () => {
    return (
        <div className="items">
            <ul>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faChalkboardUser} />
                    <Link className="link-a" to="#">Class List</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faChalkboard} />
                    <Link className="link-a" to="#">Empty Class</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faListCheck} />
                    <Link className="link-a" to="#">Quiz List</Link>
                </li>
                <li>
                    <FontAwesomeIcon className="menu-icon" icon={faCircleQuestion} />
                    <Link className="link-a" to="#">Manager Help</Link>
                </li>
            </ul>
        </div>

    )
};

export default memo(Menu);