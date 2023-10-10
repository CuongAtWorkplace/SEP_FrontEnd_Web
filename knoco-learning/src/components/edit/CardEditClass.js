import React, { useState } from "react";
import './CardEditClass.css'

const CardEditClass = () => {
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
            <form onSubmit={handleSubmit}>
                <h2>Edit Class</h2>
                <label>Class Name:</label>
                <input type="text" name="ClassName" value={formData.ClassName} onChange={handleInputChange} required />

                <label>Topic:</label>
                <input type="text" name="Topic" value={formData.Topic} onChange={handleInputChange} required />

                <label>Fee:</label>
                <input type="text" name="Fee" value={formData.Fee} onChange={handleInputChange} required />

                <label>Number of Weeks:</label>
                <input type="number" name="NumberOfWeek" value={formData.NumberOfWeek} onChange={handleInputChange} required />

                <label>Phone Number:</label>
                <input type="tel" name="NumberPhone" value={formData.NumberPhone} onChange={handleInputChange} required />

                <label>Description:</label>
                <textarea name="Description" value={formData.Description} onChange={handleInputChange} required />

                <label>Start Date:</label>
                <input type="date" name="StartDate" value={formData.StartDate} onChange={handleInputChange} required />

                <label>End Date:</label>
                <input type="date" name="EndDate" value={formData.EndDate} onChange={handleInputChange} required />

                <input id="submit" type="submit" name="submit" value="Edit class"/>
            </form>
        </div>
    );
};

export default CardEditClass;