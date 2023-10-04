import './navbar.scss';
import { BsSearch, BsBell } from "react-icons/bs";
import {MdOutlineSettings } from "react-icons/md";

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='logo'>
                <span>Knoco</span>
            </div>
            <div className='icons'>
                <BsSearch className="icon"/>
                {/* <img src="/app.svg" alt="" className="icon" />
                <img src="/expand.svg" alt="" className="icon" /> */}
                <div className="notification">
                    <BsBell/>
                    <span>1</span>
                </div>
                <div className="user">
                    <img
                        src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                        alt=""
                    />
                    <span>Xuan Ly</span>
                </div>
                <MdOutlineSettings className="icon" />
            </div>
        </div>
    );
};

export default Navbar;