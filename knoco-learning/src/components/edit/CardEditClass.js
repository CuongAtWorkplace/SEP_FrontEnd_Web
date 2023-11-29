import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/Teacher/Edit.css'
import { toast } from 'react-toastify';
const CardEditClass = ({ closePopup }) => {
    const params = useParams();
    const [classDt, setClassDt] = useState({});
    const [className, setClassName] = useState('');
    const [topic, setTopic] = useState('');
    const [schedule, setSchedule] = useState('');
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
            setSchedule(responseData.schedule || '');
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
        if (numberOfWeek < 1) {
            toast.error("Failed. Try Again!!!");
        } else {
            const classUpdate = {
                classId: classDt.classId,
                className: className,
                topic: topic,
                schedule: schedule,
                fee: fee,
                numberOfWeek: numberOfWeek,
                numberPhone: numberPhone,
                description: description,
                startDate: startDate,
                endDate: endDate
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
                    toast.success("Successfull !!!")
                    closePopup();
                    window.location.reload();
                } else {
                    console.error('Lỗi khi cập nhật dữ liệu lớp học:', response.status, response.statusText);
                }
            } catch (error) {
                toast.error("Failed. Try Again!!!")
                console.error('Lỗi khi cập nhật dữ liệu lớp học:', error);
            }
        }

    };

    return (
        <div className="card-edit-class">
            <form onSubmit={handleSubmit}>
                <h2>Edit Class</h2>
                <div className="form-group" >
                    <label className="control-label">Class Name:</label>
                    <input className="form-control" type="text" id="ClassName" name="ClassName" value={className} onChange={(e) => setClassName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="control-label">Topic:</label>
                    <input className="form-control" type="text" id="Topic" name="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="control-label">Schedule:</label>
                    <input className="form-control" type="text" id="Schedule" name="Schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="control-label">Fee:</label>
                    <input className="form-control" type="text" id="Fee" name="Fee" value={fee} onChange={(e) => setFee(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="control-label">Number of Weeks:</label>
                    <input className="form-control" type="number" id="NumberOfWeek" name="NumberOfWeek" value={numberOfWeek} onChange={(e) => setNumberOfWeek(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="control-label">Phone Number:</label>
                    <input className="form-control" type="tel" id="NumberPhone" name="NumberPhone" value={numberPhone} onChange={(e) => setNumberPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="control-label"> Description:</label>
                    <textarea className="form-control" id="Description" name="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="control-label">Start Date:</label>
                    <input className="form-control" type="date" name="StartDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="control-label">End Date:</label>
                    <input className="form-control" type="date" name="EndDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </div>
                <button type="submit" id="submit" name="submit" className="btn-btn">Edit</button>
                <button type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardEditClass;