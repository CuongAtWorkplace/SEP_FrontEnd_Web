import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
    return (
        <div class="navigation">
            <div class="n1">
                <div>
                    <i id="menu-btn" class="fa-solid fa-bars"></i>
                </div>
                <div class="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    {/* <input type="text" placeholder="Search"> */}
                    <input name="" placeholder="Search"/>
                </div>
            </div>

            <div class="profile">
                <i class="fa-solid fa-bell"></i>
                <FontAwesomeIcon className="img-icon" icon={faChalkboardUser} />
                <div class="dropdown-menu" id="dropdown-menu">
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