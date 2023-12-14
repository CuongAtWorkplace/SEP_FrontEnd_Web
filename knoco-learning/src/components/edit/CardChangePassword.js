import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/Teacher/Edit.css'
import { API_BASE_URL } from "../../paths";
import { toast } from 'react-toastify';

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
            const response = await fetch(`${API_BASE_URL}/api/User/GetUserProfile/${2}`); // Thay thế URL bằng API thực tế
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
            password: password,
            newPassword: newPassword,
            rePassword: rePassword
        };

        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/User/ChangePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userUpdate)
            });
            if (response.ok) {
                console.log('Dữ liệu người dùng đã được cập nhật thành công');
                toast.success("Change password successful!");
                closePopup();
            } else {
                console.error('Lỗi khi cập nhật dữ liệu người dùng:', response.status, response.statusText);
                toast.error("Failed. Try Again!!!");
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu người dùng:', error);
            toast.error("Failed. Try Again!!!");
        }
    };

    return (
        <div className="card-edit-class">
            <form onSubmit={handleSubmit}>
                <h2>Change Password <label className="control-label">{email}</label> </h2>
                

                <div className="form-group">
                    <label className="control-label">Old password:</label>
                    <input className="form-control" type="password" id="Password" name="Password" onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label"> New password:</label>
                    <input className="form-control" type="password" id="NewPassword" name="NewPassword" onChange={(e) => setNewPassword(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Re password:</label>
                    <input className="form-control" type="password" id="RePassword" name="RePassword" onChange={(e) => setRePassword(e.target.value)} required />
                </div>

                <button type="submit" id="submit" name="submit" className="btn-btn">Edit</button>
                <button type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardChangePassword;