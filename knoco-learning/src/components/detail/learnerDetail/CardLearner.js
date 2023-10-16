import React, { useState, useEffect } from "react";
import './style.css';
import myImage from './profile.jpg';

const CardLearner = ({ learner, onBackClick }, props) => {
    const { userId } = props;
    const [learnerId, setClassDt] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetStudentDetailInClass/${userId}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    return (
        <div className="container">
            {learnerId ? (
                <div className="profile-box">
                    <img src={myImage} alt="Profile" />
                    <h2>{learnerId.fullName}</h2>
                    <p>Email: {learnerId.email}</p>
                    <p>Phone number: {learnerId.phone}</p>
                    <p>Description: {learnerId.description}</p>
                    <p>Address: {learnerId.address}</p>
                    <button onClick={onBackClick}>Back</button>
                </div>
            ) : (
                <div className="container">
                    <div className="profile-box">
                        <img src={myImage} alt="Profile" />
                        <h2>fullName</h2>
                        <p>Email: email</p>
                        <p>Phone number: phone</p>
                        <p>Description: description</p>
                        <p>Address: address</p>
                        <button onClick={onBackClick}>Back</button>
                    </div>
                </div>

            )}

        </div>
    );
}

export default CardLearner;