import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/Teacher/Edit.css';

const CardAddClass = ({ closePopup }) => {
    const params = useParams();
    const [classDt, setClassDt] = useState({});
    const [className, setClassName] = useState('');
    const [course, setCourse] = useState([]);
    const [courseId, setcourseId] = useState(0);
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
            const response = await fetch(`https://localhost:7169/api/Course/GetAllCourse`); // Thay thế URL bằng API thực tế
            const responseData = await response.json();
            setCourse(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    const handleSubmit = async (e) => {
        // {
        //     "className": "str2ing",
        //     "teacherId": 2,
        //     "courseId": 2,
        //     "numberStudent": 3,
        //     "topic": "stri2ng",
        //     "schedule": "str2ing",
        //     "fee": "100",
        //     "numberOfWeek": "12",
        //     "numberPhone": "12",
        //     "description": "striang",
        //     "createDate": "2023-12-09T18:37:32.826Z",
        //     "startDate": "2023-12-09T18:37:32.826Z",
        //     "endDate": "2023-12-09T18:37:32.826Z",
        //     "status": 1,
        //     "isDelete": true,
        //     "tokenClass": "strinag"
        //   }
        const classCreate = {
            className: className,
            teacherId: null,
            courseId: courseId,
            numberStudent: 5,
            topic: topic,
            schedule: null,
            fee: fee,
            numberOfWeek: numberOfWeek,
            numberPhone: numberPhone,
            description: description,
            createDate: null,
            startDate: startDate,
            endDate: endDate,
            status: 1,
            isDelete: false,
            tokenClass: null
        };

        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7169/api/Class/CreateClassManager`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(classCreate)
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
                <h2>Add new class</h2>
                <div className="form-group">
                    <label className="control-label">Class Name:</label>
                    <input class="form-control" type="text" id="ClassName" name="ClassName" value={className} onChange={(e) => setClassName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="control-label">Course :</label>
                    <select className="form-select"
                        onChange={(e) => setcourseId(e.target.value)
                        }
                        value={courseId}
                    >
                        {course.map(cou => <option value={cou.courseId} key={cou.courseId}>
                            {cou.courseName}
                        </option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label className="control-label">Topic:</label>
                    <input class="form-control" type="text" id="Topic" name="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Fee:</label>
                    <input class="form-control" type="text" id="Fee" name="Fee" value={fee} onChange={(e) => setFee(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Number of Weeks:</label>
                    <input class="form-control" type="number" id="NumberOfWeek" name="NumberOfWeek" value={numberOfWeek} onChange={(e) => setNumberOfWeek(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Phone Number:</label>
                    <input class="form-control" type="tel" id="NumberPhone" name="NumberPhone" value={numberPhone} onChange={(e) => setNumberPhone(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Description:</label>
                    <textarea class="form-control" id="Description" name="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Start Date:</label>
                    <input class="form-control" type="date" name="StartDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">End Date:</label>
                    <input class="form-control" type="date" name="EndDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </div>

                <button type="submit" id="submit" name="submit" className="btn-btn">Create</button>
                <button class="form-control" type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardAddClass;