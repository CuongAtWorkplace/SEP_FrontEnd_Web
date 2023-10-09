import React, { useState, useEffect } from "react";
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,
        faPeopleGroup,
        faCalendarDays}from '@fortawesome/free-solid-svg-icons';
const CardClass = (props) => {
    const { classId } = props;
    const [classDt, setClassDt] = useState(null);

    return(
        <div className="conval">
            <div className="values">
                <div className="val-box">
                    <FontAwesomeIcon className="menu-icon" icon={faPeopleGroup} />
                    <div>
                        <h3>{classDt.name}</h3>
                        <span>{classDt.subject}</span>
                    </div>
                </div>
                <div className="val-box">
                    <FontAwesomeIcon className="menu-icon" icon={faUser} />
                    <div>
                        <h3>{classDt.member}</h3>
                        <span>Members</span>
                    </div>
                </div>
                <div className="val-box">
                    <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                    <div>
                        <h3>{classDt.start}</h3>
                        <span>Start date</span>
                    </div>
                </div>
                <div className="val-box">
                    <FontAwesomeIcon className="menu-icon" icon={faCalendarDays} />
                    <div>
                        <h3>{classDt.end}</h3>
                        <span>End date</span>
                    </div>
                </div>
                <div>
                    <button className="btn-edit">
                        Edit class
                    </button>
            </div>
            </div>
            
        </div>
      );
}

export default CardClass;