import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/Teacher/Edit.css'

const CardEditClass = ({ closePopup }) => {
    const params = useParams();
    const [classDt, setClassDt] = useState({});
    const [className, setClassName] = useState('');
    const [topic, setTopic] = useState('');
    const [fee, setFee] = useState('');
    const [numberOfWeek, setNumberOfWeek] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Class/GetTeacherClassDetail/${params.classId}`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setClassDt(responseData);
            setClassName(responseData.className || '');
            setTopic(responseData.topic || '');
            setFee(responseData.fee || '');
            setNumberOfWeek(responseData.numberOfWeek || '');
            setNumberPhone(responseData.numberPhone || '');
            setDescription(responseData.description || '');
            setStartDate(formatDate(responseData.startDate) || '');
            setEndDate(formatDate(responseData.endDate) || '');
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    const handleSubmit = async (e) => {

        const classUpdate = {
            classId: classDt.classId,
            className: className,
            topic: topic,
            fee: fee,
            numberOfWeek: numberOfWeek,
            numberPhone: numberPhone,
            description: description
            //startDate: startDate,
            //endDate: endDate
        };

        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7169/api/Class/EditClass`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(classUpdate)
            });
            if (response.ok) {
                console.log('Dữ liệu lớp học đã được cập nhật thành công');
                closePopup();
                window.location.reload();
            } else {
                console.error('Lỗi khi cập nhật dữ liệu lớp học:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu lớp học:', error);
        }
    };

    return (
        <div className="card-edit-class">
            <form onSubmit={handleSubmit}>
                <h2>Edit Class</h2>
                <label>Class Name:</label>
                <input type="text" id="ClassName" name="ClassName" value={className} onChange={(e) => setClassName(e.target.value)} required />

                <label>Topic:</label>
                <input type="text" id="Topic" name="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />

                <label>Fee:</label>
                <input type="text" id="Fee" name="Fee" value={fee} onChange={(e) => setFee(e.target.value)} required />

                <label>Number of Weeks:</label>
                <input type="number" id="NumberOfWeek" name="NumberOfWeek" value={numberOfWeek} onChange={(e) => setNumberOfWeek(e.target.value)} required />

                <label>Phone Number:</label>
                <input type="tel" id="NumberPhone" name="NumberPhone" value={numberPhone} onChange={(e) => setNumberPhone(e.target.value)} required />

                <label>Description:</label>
                <textarea id="Description" name="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label>Start Date:</label>
                <input type="date" name="StartDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

                <label>End Date:</label>
                <input type="date" name="EndDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

                <button type="submit" id="submit" name="submit" className="btn-btn">Edit</button>
                <button type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardEditClass;