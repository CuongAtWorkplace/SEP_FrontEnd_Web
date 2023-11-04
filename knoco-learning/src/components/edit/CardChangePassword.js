import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './CardEditClass.css'

const CardChangePassword = ({ closePopup }) => {
    //const params = useParams();
    const [userDt, setUserDt] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetUserProfile/${2}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setUserDt(responseData);
            setEmail(responseData.email || '');
            setPassword(responseData.password || '');
            setNewPassword(responseData.newPassword || '');
            setRePassword(responseData.rePassword || '');
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const handleSubmit = async (e) => {

        const userUpdate = {
            userId: userDt.userId,
            email: userDt.email,
            password: password,
            newPassword: newPassword,
            rePassword: rePassword
        };

        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7169/api/User/ChangePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userUpdate)
            });
            if (response.ok) {
                console.log('Dữ liệu người dùng đã được cập nhật thành công');
                closePopup();
                window.location.reload();
            } else {
                console.error('Lỗi khi cập nhật dữ liệu người dùng:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu người dùng:', error);
        }
    };

    return (
        <div className="card-edit-class">
            <form onSubmit={handleSubmit}>
                <h2>Change Password</h2>
                <label>{userDt.email}</label>

                <label>Old password:</label>
                <input type="password" id="Password" name="Password" onChange={(e) => setPassword(e.target.value)} required />

                <label> New password:</label>
                <input type="password" id="NewPassword" name="NewPassword" onChange={(e) => setNewPassword(e.target.value)} required />

                <label>Re password:</label>
                <input type="password" id="RePassword" name="RePassword" onChange={(e) => setRePassword(e.target.value)} required />

                <input id="submit" type="submit" name="submit" value="Edit" />
                <button type="button" onClick={closePopup} className="btn-cancel">Cancel</button>
            </form>
        </div>
    );
};

export default CardChangePassword;