import React from "react";
import './style.css';
import myImage from './profile.jpg';

const CardLearner = (props) =>{
    const {learner} = props;

    return(
        <div className="container">
            <div className="profile-box">
                <img src={myImage} alt="Profile"/>
                <h2>{learner.name}</h2>
                <p>Gender: {learner.gender}</p>
                <p>Email: {learner.email}</p>
                <p>Phone number: {learner.phone}</p>
            </div>
        </div>
    );
}

export default CardLearner;