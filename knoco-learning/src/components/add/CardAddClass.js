import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/Teacher/Edit.css';
import { API_BASE_URL } from "../../paths";
import { toast } from 'react-toastify';
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
    const currentDate = new Date();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/Course/GetAllCourse`); // Thay thế URL bằng API thực tế
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

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validateClassname = (classname) => {
        const containsWhitespace = /\s/;
        return containsWhitespace.test(classname); // Nếu có khoảng trắng, từ chối
    };
    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const validateEndDate = (beforeDate, afterDate) => {
        const beforeDateObj = new Date(beforeDate);
        const afterDateObj = new Date(afterDate);

        if (afterDateObj <= beforeDateObj) {
            return false;
        }
        return true;
    };
    const  checkClassNameExistence = async (className) => {
        try {
            const response = await fetch(`${API_BASE_URL}api/Class/CheckClassName?className=${className}`);
            if (response.ok) {
                return false; 
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    const CreateRoomChat = async (classId) => {

        const classC = {
            chatRoomName: "Room chat class",
            description: "Room chat class",
            isManagerChat: true,
            classId: classId
        }
        fetch(`${API_BASE_URL}/api/RequestManager/CreateChatRoomManage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classC)
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Create chat room successful!");
                    fetchData();
                }
                else if (!response.ok) {
                    toast.error("Create chat room failed. Try Again!")
                    throw new Error('Failed to update');
                }

            })
    }
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (isNaN(fee)) {
            toast.error("Please enter a valid fee.");
            return;
        }

        if (isNaN(numberOfWeek) || numberOfWeek < 1) {
            toast.error("Please enter a valid number of weeks.");
            return;
        }

        if (!validatePhoneNumber(numberPhone)) {
            toast.error("Please enter a valid phone number.");
            return;
        }

        const isStartDateValid = validateEndDate(currentDate, startDate);
        if (!isStartDateValid) {
            toast.error("Start date cannot be before create date.");
            return;
        }
        const isclassName = validateClassname(className);
        if (isclassName) {
            toast.error("Class names do not contain spaces");
            return;
        }
        const isEndDateValid = validateEndDate(startDate, endDate);
        if (!isEndDateValid) {
            toast.error("End date cannot be before start date.");
            return;
        }
        const checkclassName = checkClassNameExistence(className);
        if (checkclassName) {
            toast.error("Class Name is duplicated");
            return;
        }
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
            createDate: currentDate,
            startDate: startDate,
            endDate: endDate,
            status: 1,
            isDelete: false,
            tokenClass: null
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/Class/CreateClassManager`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(classCreate)
            });
            if (response.ok) {

                console.log('Dữ liệu lớp học đã được cập nhật thành công');
                toast.success("Add new class successfull!");
                const data = await response.json();
                CreateRoomChat(Number(data));
                closePopup();
                window.location.reload();
            } else {
                console.error('Lỗi khi cập nhật dữ liệu lớp học:', response.status, response.statusText);
                toast.error("Add new class failed. Try Again!");
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu lớp học:', error);
            toast.error("Add new class failed. Try Again!");
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
                    <select required className="form-select"
                        onChange={(e) => setcourseId(e.target.value)}
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
                    <input class="form-control" type="text" id="Fee" name="Fee" min={0} value={fee} onChange={(e) => setFee(e.target.value)} required />
                </div>
                <div className="form-group">

                    <label className="control-label">Number in Weeks:</label>
                    <input class="form-control" type="number" id="NumberOfWeek" name="NumberOfWeek" min={0} value={numberOfWeek} onChange={(e) => setNumberOfWeek(e.target.value)} required />

                </div>

                <div className="form-group">
                    <label className="control-label">Phone Number:</label>
                    <input class="form-control" type="tel" id="NumberPhone" name="NumberPhone" value={numberPhone} onChange={(e) => setNumberPhone(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Description:</label>
                    <textarea class="form-control" id="Description" name="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="d-flex form-group">
                    <label className="control-label">Start Date:</label>
                    <input class="form-control" type="date" name="StartDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    <label className="control-label">End Date:</label>
                    <input class="form-control" type="date" name="EndDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </div>

                <div className="form-group">
                </div>

                <button type="submit" id="submit" name="submit" className="btn-btn">Create</button>
                <button class="form-control" type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardAddClass;