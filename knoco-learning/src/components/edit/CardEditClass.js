import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './CardEditClass.css'

const CardEditClass = ({ closePopup }) => {
    const params = useParams();
    const [classDt, setClassDt] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Class/GetTeacherClassDetail/${params.classId}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            const formattedClassDt = {
                ...responseData,
                startDate: formatDate(responseData.startDate),
                endDate: formatDate(responseData.endDate)
            };
            setClassDt(formattedClassDt);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    const [formData, setFormData] = useState({
        ClassName: "${classDt.className}",
        Topic: "",
        Fee: "",
        NumberOfWeek: "",
        NumberPhone: "",
        Description: "",
        StartDate: "",
        EndDate: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7169/api/Class/EditClass/${params.classId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Dữ liệu lớp học đã được cập nhật thành công');
                closePopup();
            } else {
                console.error('Lỗi khi cập nhật dữ liệu lớp học:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu lớp học:', error);
        }
    };

    return (
        <div className="card-edit-class">
            {classDt ? (
                <form onSubmit={handleSubmit}>
                    <h2>Edit Class</h2>
                    <label>Class Name:</label>
                    <input type="text" id="ClassName" name="ClassName" value={formData.className} onChange={handleInputChange} required />

                    <label>Topic:</label>
                    <input type="text" id="Topic" name="Topic" value={formData.topic} onChange={handleInputChange} required />

                    <label>Fee:</label>
                    <input type="text" id="Fee" name="Fee" value={formData.fee} onChange={handleInputChange} required />

                    <label>Number of Weeks:</label>
                    <input type="number" id="NumberOfWeek" name="NumberOfWeek" value={formData.numberOfWeek} onChange={handleInputChange} required />

                    <label>Phone Number:</label>
                    <input type="tel" id="NumberPhone" name="NumberPhone" value={formData.numberPhone} onChange={handleInputChange} required />

                    <label>Description:</label>
                    <textarea id="Description" name="Description" value={formData.description} onChange={handleInputChange} required />

                    <label>Start Date:</label>
                    <input type="date" name="StartDate" value={formData.startDate} onChange={handleInputChange} required />

                    <label>End Date:</label>
                    <input type="date" name="EndDate" value={formData.endDate} onChange={handleInputChange} required />

                    <input id="submit" type="submit" name="submit" value="Edit" />
                    <button type="button" onClick={closePopup} className="btn-cancel">Cancel</button>
                </form>
            ) : (
                <p>Loading class information...</p>
            )}

        </div>
    );
};

export default CardEditClass;