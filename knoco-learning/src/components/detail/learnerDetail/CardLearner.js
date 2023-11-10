import React, { useState, useEffect } from "react";
import './style.css';
import myImage from './profile.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CardLearner = ({ learner, onBackClick }, props) => {
    //const { userId } = props;
    const [learnerId, setClassDt] = useState(null);
    console.log(learner);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetStudentDetailInClass/${learner.userId}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    return (
        <div className="container">
            {learnerId ? (
                <div className="user-box">
                    <img src={myImage} alt="Profile" />
                    <h2>{learnerId.fullName}</h2>
                    <p><strong>Email: </strong> {learnerId.email}</p>
                    <p><strong>Phone number: </strong> {learnerId.phone}</p>
                    <p><strong>Description: </strong> {learnerId.description}</p>
                    <p><strong>Address: </strong> {learnerId.address}</p>
                    <button onClick={onBackClick}><FontAwesomeIcon icon={faArrowLeft}/> Back</button>
                </div>
            ) : (
                <div className="container">
                    <div className="user-box">
                        <img src={myImage} alt="Profile" />
                        <h2>Full name</h2>
                        <p><strong>Email: </strong> email</p>
                        <p><strong>Phone number: </strong> phone</p>
                        <p><strong>Description: </strong> description</p>
                        <p><strong>Address: </strong> address</p>
                        <button onClick={onBackClick}><FontAwesomeIcon icon={faArrowLeft}/> Back</button>
                    </div>
                </div>

            )}

        </div>
    );
}

export default CardLearner;