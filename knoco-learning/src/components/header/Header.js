import { useState, useEffect } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import CardChangePassword from "../../components/edit/CardChangePassword";
import myImage from '../../assets/profile.jpg';
import $ from "jquery";

const Header = () => {
    const UserID = 2;
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isChangePasswordPopupVisible, setChangePasswordPopupVisible] = useState(false);
    const [imageSource, setImageSource] = useState("");
    useEffect(() => {
        // Add click event listener to menu-btn
        $('.menu-btn').on('click', function () {
            $('#menu').toggleClass('active'); // Toggle active class on #menu
        });
        fetchImage();
    }, []);
    const fetchImage = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetUserImage/GetImage/${UserID}`);
            if (response.ok) {
                const imageData = await response.blob();
                setImageSource(URL.createObjectURL(imageData));
            }
        } catch (error) {
            console.error('Lỗi khi lấy ảnh:', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };
    const navigate = useNavigate();
    const handleNotiClick = () => {
        navigate(`/notificationteacher`);
    };

    const openChangePasswordPopup = () => {
        setChangePasswordPopupVisible(true);
    }

    const closeChangePasswordPopup = () => {
        setChangePasswordPopupVisible(false);
    }

    return (
        <div className="navigation">
            <div className="n1">
                <div>
                    <FontAwesomeIcon id="menu-btn" icon={faBars} />
                </div>
            </div>

            <div className="profile">
                <FontAwesomeIcon className="icon-profile" icon={faBell} onClick={handleNotiClick} />
                {/* <FontAwesomeIcon className="icon-img" icon={faChalkboardUser} onClick={toggleDropdown} /> */}
                <img src={imageSource || myImage} alt={imageSource || "Profile"} className="icon-img" onClick={toggleDropdown} />
                <div className={`dropdown-menu ${isDropdownVisible ? "active" : ""}`} id="dropdown-menu">
                    <ul>
                        <li><Link className="link-a" to="#" onClick={openChangePasswordPopup}>Change Password</Link></li>
                        <li><Link className="link-a" to="#">Log Out</Link></li>
                    </ul>
                </div>
            </div>
            {isChangePasswordPopupVisible && (
                <div className="popup">
                    <CardChangePassword closePopup={closeChangePasswordPopup} />
                </div>
            )}
        </div>
    )
};

export default memo(Header);