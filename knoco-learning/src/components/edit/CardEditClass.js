import React, { useState, useEffect } from "react";
import './CardEditClass.css'

const CardEditClass = (props) => {
    const { classId } = props;
    const [classDt, setClassDt] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Class/GetTeacherClassDetail/${1}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const [formData, setFormData] = useState({
        ClassName: '',
        Topic: '',
        Fee: '',
        NumberOfWeek: '',
        NumberPhone: '',
        Description: '',
        StartDate: '',
        EndDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData); // For example, log the form data to the console
    };

    return (
        <div className="card-edit-class">
            {classDt ? (
                <form onSubmit={handleSubmit}>
                    <h2>Edit Class</h2>
                    <label>Class Name:</label>
                    <input type="text" name="ClassName" value={classDt.className} onChange={handleInputChange} required />

                    <label>Topic:</label>
                    <input type="text" name="Topic" value={classDt.topic} onChange={handleInputChange} required />

                    <label>Fee:</label>
                    <input type="text" name="Fee" value={classDt.fee} onChange={handleInputChange} required />

                    <label>Number of Weeks:</label>
                    <input type="number" name="NumberOfWeek" value={classDt.numberOfWeek} onChange={handleInputChange} required />

                    <label>Phone Number:</label>
                    <input type="tel" name="NumberPhone" value={classDt.numberPhone} onChange={handleInputChange} required />

                    <label>Description:</label>
                    <textarea name="Description" value={classDt.description} onChange={handleInputChange} required />

                    <label>Start Date:</label>
                    <input type="date" name="StartDate" value={classDt.startDate} onChange={handleInputChange} required />

                    <label>End Date:</label>
                    <input type="date" name="EndDate" value={classDt.endDate} onChange={handleInputChange} required />

                    <input id="submit" type="submit" name="submit" value="Edit class" />
                </form>
            ) : (
                <p>Loading class information...</p>

            )}

        </div>
    );
};

export default CardEditClass;