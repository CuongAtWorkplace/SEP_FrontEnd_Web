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
            setClassDt(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const editData = async (updatedData) => {
        try {
            const response = await fetch(`https://localhost:7169/api/Class/EditClass/${params.classId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                console.log('Class edited successfully!');
                // Perform any additional actions after editing the class
            } else {
                console.error('Failed to edit the class:', response.statusText);
            }
        } catch (error) {
            console.error('Error while editing the class:', error);
        }
    };

    const updatedData = {
        className: document.getElementById('ClassName').value,
        topic: document.getElementById('Topic').value,
        fee: document.getElementById('Fee').value,
        numberOfWeek: document.getElementById('NumberOfWeek').value,
        numberPhone: document.getElementById('NumberPhone').value,
        description: document.getElementById('Description').value,
        startDate: "2023-10-16T18:42:10.606Z",
        endDate: "2023-10-16T18:42:10.606Z"
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
        closePopup();
    };

    return (
        <div className="card-edit-class">
            {classDt ? (
                <form onSubmit={handleSubmit}>
                    <h2>Edit Class</h2>
                    <label>Class Name:</label>
                    <input type="text" id="ClassName" name="ClassName" value={classDt.className} onChange={handleInputChange} required />

                    <label>Topic:</label>
                    <input type="text" id="Topic" name="Topic" value={classDt.topic} onChange={handleInputChange} required />

                    <label>Fee:</label>
                    <input type="text" id="Fee" name="Fee" value={classDt.fee} onChange={handleInputChange} required />

                    <label>Number of Weeks:</label>
                    <input type="number" id="NumberOfWeek" name="NumberOfWeek" value={classDt.numberOfWeek} onChange={handleInputChange} required />

                    <label>Phone Number:</label>
                    <input type="tel" id="NumberPhone" name="NumberPhone" value={classDt.numberPhone} onChange={handleInputChange} required />

                    <label>Description:</label>
                    <textarea id="Description" name="Description" value={classDt.description} onChange={handleInputChange} required />

                    <label>Start Date:</label>
                    <input type="date" name="StartDate" value={classDt.startDate} onChange={handleInputChange} required />

                    <label>End Date:</label>
                    <input type="date" name="EndDate" value={classDt.endDate} onChange={handleInputChange} required />

                    <input id="submit" type="submit" name="submit" onClick={editData} value="Edit class" />
                    <button type="button" onClick={closePopup} className="btn-cancel">Cancel</button>
                </form>
            ) : (
                <p>Loading class information...</p>

            )}

        </div>
    );
};

export default CardEditClass;