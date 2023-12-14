import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './style.css';
import myImage from '../../../assets/profile.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../../paths";
const CardLearner = ({ learner, onBackClick }) => {
    const [learnerId, setClassDt] = useState(null);
    const [imageSource, setImageSource] = useState("");
    const params = useParams();
    useEffect(() => {
        fetchData();
        fetchImage();
    }, []);


    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/User/GetStudentDetailInClass/${learner.userId}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const fetchImage = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/User/GetUserImage/GetImage/${learner.userId}`);
            if (response.ok) {
                const imageData = await response.blob();
                setImageSource(URL.createObjectURL(imageData));
            }
        } catch (error) {
            console.error('Lỗi khi lấy ảnh:', error);
        }
    };

    const BtnDelete = async () => {

        try {
            const response = await fetch(`${API_BASE_URL}/api/Class/DeleteStudentInClass?classId=${params.classId}&studentId=${learner.userId}`
                , {
                    method: 'DELETE'
                }); // Thay thế URL bằng API thực tế

            if (response.ok) {
                window.location.reload();
            }
            const responseData = await response.json();
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    }

    return (
        <div className="container-box">
            {learnerId ? (
                <div className="user-box">
                    <img src={imageSource || myImage} alt={learnerId.image || "Profile"} />
                    <h2>{learnerId.fullName}</h2>
                    <p><strong>Email: </strong> {learnerId.email}</p>
                    <p><strong>Phone number: </strong> {learnerId.phone}</p>
                    <p><strong>Description: </strong> {learnerId.description}</p>
                    <p><strong>Address: </strong> {learnerId.address}</p>
                    <button onClick={onBackClick}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                    <button onClick={BtnDelete}><FontAwesomeIcon icon={faArrowLeft} /> Delete</button>
                </div>
            ) : (
                <div className="user-box">
                    <img src={myImage} alt="Profile" />
                    <h2>fullName</h2>
                    <p><strong>Email: </strong> email</p>
                    <p><strong>Phone number: </strong> phone number</p>
                    <p><strong>Description: </strong> description</p>
                    <p><strong>Address: </strong> address</p>
                    <button onClick={onBackClick}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                </div>
            )}

        </div>
    );
}

export default CardLearner;