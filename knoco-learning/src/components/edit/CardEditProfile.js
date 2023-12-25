import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/Teacher/Edit.css'
import { toast } from 'react-toastify';
import { API_BASE_URL } from "../../paths";
import jwtDecode from "jwt-decode";

const CardEditProfile = ({ closePopup }) => {
    //const params = useParams();
    const [userDt, setUserDt] = useState({});
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const response = await fetch(`${API_BASE_URL}/api/User/GetUserProfile/${decodedToken.userid}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setUserDt(responseData);
            setFullName(responseData.fullName || '');
            setEmail(responseData.email || '');
            setPhone(responseData.phone || '');
            setDescription(responseData.description || '');
            setAddress(responseData.address || '');
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email.");
            return;
        }

        if (!validatePhoneNumber(phone)) {
            toast.error("Please enter a valid phone number.");
            return;
        }

        const userUpdate = {
            userId: userDt.userId,
            fullName: fullName,
            email: email,
            phone: phone,
            description: description,
            address: address
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/User/EditProfile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userUpdate)
            });
            if (response.ok) {
                console.log('Dữ liệu người dùng đã được cập nhật thành công');
                toast.success("Update profile successful!")
                closePopup();
                fetchData();
                //window.location.reload();
            } else {
                console.error('Lỗi khi cập nhật dữ liệu người dùng:', response.status, response.statusText);
            }
        } catch (error) {
            toast.error("Update profile failed. Try Again!!!")
            console.error('Lỗi khi cập nhật dữ liệu người dùng:', error);
        }
    };

    return (
        <div className="card-edit-class">
            <form onSubmit={handleSubmit}>
                <h2>Edit Profile</h2>

                <div className="form-group">
                    <label className="control-label">Full Name:</label>
                    <input className="form-control" type="text" id="FullName" name="FullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Email:</label>
                    <input className="form-control" type="email" id="Email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Phone:</label>
                    <input className="form-control" type="text" id="Phone" name="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Description:</label>
                    <textarea className="form-control" id="Description" name="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Address:</label>
                    <textarea className="form-control" id="Address" name="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>

                <button type="submit" id="submit" name="submit" className="btn-btn">Edit</button>
                <button type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardEditProfile;