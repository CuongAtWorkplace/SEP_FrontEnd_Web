import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
    return (
        <div className="navigation">
            <div className="n1">
                <div className="pape-h2">
                    <h2>Home</h2>
                </div>
                <div className="search">
                    <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
                    <input type="text" placeholder="Search" />
                </div>
            </div>

            <div className="profile">
                <FontAwesomeIcon className="icon-profile" icon={faBell} />
                <FontAwesomeIcon className="icon-img" icon={faChalkboardUser} />
                <div className="dropdown-menu" id="dropdown-menu">
                    <ul>
                        <li><Link className="link-a" to="#">Change Password</Link></li>
                        <li><Link className="link-a" to="#">Log Out</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default memo(Header);