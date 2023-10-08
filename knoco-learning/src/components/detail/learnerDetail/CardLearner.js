import React from "react";
import './style.css';
import myImage from './profile.jpg';

const CardLearner = () =>{
    return(
        <div className="container">
            <div className="profile-box">
                <img src={myImage} alt="Profile"/>
                <h2>Le Quang Huy</h2>
                <p>Male</p>
                <p>Email: alksdjalks@gmail.com</p>
                <p>Phone number: 0977935037</p>
            </div>
        </div>
    );
}

export default CardLearner;