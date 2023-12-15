import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myImage from '../../assets/profile.jpg';
import '../../style/Teacher/Edit.css';
import { toast } from 'react-toastify';
import { API_BASE_URL } from "../../paths";
import jwtDecode from "jwt-decode";

const CardChangeImage = ({ closePopup }) => {
    const [userDt, setUserDt] = useState({});
    //const [imageSource, setImage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchData();
        fetchImage();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const response = await fetch(`${API_BASE_URL}/api/User/GetUserProfile/${decodedToken.userid}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setUserDt(responseData);
            setSelectedImage(responseData.image || '');
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const fetchImage = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const response = await fetch(`${API_BASE_URL}/api/User/GetUserImage/GetImage/${decodedToken.userid}`);
            if (response.ok) {
                const imageData = await response.blob();
                setSelectedImage(URL.createObjectURL(imageData));
            }
        } catch (error) {
            console.error('Lỗi khi lấy ảnh:', error);
        }
    };

    const handleImageChange = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            console.error('Vui lòng chọn ảnh');
            return;
        }

        setSelectedImage(e.target.files[0].name);
        setImagePreview(e.target.files[0].name);

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const response = await fetch(`${API_BASE_URL}/api/User/UploadImage/UploadImage/${decodedToken.userid}`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                console.log('Hình ảnh đã được tải lên thành công');
                toast.success("Change image successful!")
                closePopup();
                window.location.reload();
            } else {
                console.error('Lỗi khi tải lên hình ảnh:', response.status, response.statusText);
                toast.error("Update image failed. Not change image!");
            }
        } catch (error) {
            console.error('Lỗi khi tải lên hình ảnh:', error);
            toast.error("Update image failed. Not change image!");
        }
    };

    const handleSubmit = async (e) => {
        // const userUpdate = {
        //     userId: userDt.userId,
        //     image: selectedImage,
        // };

        // e.preventDefault();

        // if (!selectedImage) {
        //     console.error('Vui lòng chọn ảnh');
        //     return;
        // }

        // const formData = new FormData();
        // formData.append('image', selectedImage);

        // try {
        //     const token = localStorage.getItem("token");
        //     const decodedToken = jwtDecode(token);
        //     const response = await fetch(`${API_BASE_URL}/api/User/UploadImage/UploadImage/${decodedToken.userid}`, {
        //         method: 'POST',
        //         body: formData
        //     });
        //     if (response.ok) {
        //         console.log('Hình ảnh đã được tải lên thành công');
        //         closePopup();
        //         window.location.reload();
        //     } else {
        //         console.error('Lỗi khi tải lên hình ảnh:', response.status, response.statusText);
        //     }
        // } catch (error) {
        //     console.error('Lỗi khi tải lên hình ảnh:', error);
        // }
    };

    return (
        <div className="card-img-class">
            <form onSubmit={handleSubmit}>
                <h2>Change Image</h2>

                <img src={selectedImage || myImage} alt={selectedImage || "Profile"} />
                <input className="form-control" type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />

                <div className="form-group">
                    {/* <button type="submit" id="submit" name="submit" className="btn-btn">Change</button> */}
                    <button type="button" onClick={closePopup} className="btn-btn">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CardChangeImage;