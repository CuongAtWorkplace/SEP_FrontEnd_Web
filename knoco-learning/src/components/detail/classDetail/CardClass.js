import React from "react";
import './style.css'

const CardClass = (props) => {
    const {classDt} = props;

    return(
        <div className="container">
            <div className="classDetail">
                <h2>Class Name: {classDt.name}</h2>
                <p>Subject: {classDt.subject}</p>
                <p>Members: {classDt.member}</p>
                <p>Start date: {classDt.start}</p>
                <p>End date: {classDt.end}</p>
            </div>
        </div>
    );
}

export default CardClass;