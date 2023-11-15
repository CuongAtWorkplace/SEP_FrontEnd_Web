import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './CardEditClass.css'

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
            const response = await fetch(`https://localhost:7169/api/User/GetUserProfile/${2}`); // Thay thế URL bằng API thực tế
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

    const handleSubmit = async (e) => {

        const userUpdate = {
            userId: userDt.userId,
            fullName: fullName,
            email: email,
            phone: phone,
            description: description,
            address: address
        };

        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7169/api/User/EditProfile`, {
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
                <h2>Edit Profile</h2>
                <label>Full Name:</label>
                <input type="text" id="FullName" name="FullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />

                <label>Email:</label>
                <input type="text" id="Email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Phone:</label>
                <input type="text" id="Phone" name="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                <label>Description:</label>
                <textarea id="Description" name="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label>Address:</label>
                <textarea id="Address" name="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />

                <button type="submit" id="submit" name="submit" className="btn-btn">Edit</button>
                <button type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardEditProfile;