import React, { useState, useEffect } from "react";
import './style.css';
import myImage from './profile.jpg';

const CardLearner = (props) =>{
    const {userId} = props;
    const [learnerId, setClassDt] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetStudentDetailInClass/${3}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    return(
        <div className="container">
            {learnerId ? (
                <div className="profile-box">
                <img src={myImage} alt="Profile"/>
                <h2>{learnerId.fullName}</h2>
                <p>Email: {learnerId.email}</p>
                <p>Phone number: {learnerId.phone}</p>
                <p>Description: {learnerId.description}</p>
                <p>Address: {learnerId.address}</p>
            </div>
            ) : (
                <p>Loading class information...</p>
            )}
            
        </div>
    );
}

export default CardLearner;