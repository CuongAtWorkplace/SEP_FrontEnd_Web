import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/Teacher/Add.css';

const CardAddCourse = ({ closePopup }) => {
    const params = useParams();
    const [CourseId, setCourseId] = useState('');
    const [CourseName, setCourseName] = useState('');
    const [Description, setDescription] = useState('');
    const [CreateDate, setCreateDate] = useState('');
    const [ImageCover, setImageCover] = useState('');
    const [IsDelete, setIsDelete] = useState(false);
    const [PhotoFileName, setPhotoFileName] = useState('');
    const [PhotoPath, setPhotoPath] = useState('https://localhost:7169/Photos/');
    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch(`https://localhost:7169/api/Class/GetTeacherClassDetail/${params.classId}`); // Thay thế URL bằng API thực tế
    //         const responseData = await response.json();
    //         setClassDt(responseData);
    //         setClassName(responseData.classname || '');
    //         setTopic(responseData.topic || '');
    //         setFee(responseData.fee || '');
    //         setNumberOfWeek(responseData.numberOfWeek || '');
    //         setNumberPhone(responseData.numberPhone || '');
    //         setDescription(responseData.description || '');
    //         setStartDate(formatDate(responseData.startDate) || '');
    //         setEndDate(formatDate(responseData.endDate) || '');
    //     } catch (error) {
    //         console.error('Lỗi khi lấy dữ liệu lớp học:', error);
    //     }
    // };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    const handleSubmit = async (e) => {

        const newcourse = {
            courseName: CourseName,
            description: Description,
            createDate: CreateDate,
            image: PhotoFileName,
            IsDelete: false,
            //startDate: startDate,
            //endDate: endDate
        };

        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7169/api/Course/AddNewCouse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newcourse)
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
    const imageUpload = (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem('token');

        setPhotoFileName(e.target.files[0].name);
        setImageCover(e.target.files[0].name);

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch('https://localhost:7169/api/Post/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setPhotoFileName(data);
            })
    }
    return (
        <div className="card-edit-class">
            <form onSubmit={handleSubmit}>
                <h2>Add new class</h2>

                <label>Course Name:</label>
                <input type="text" id="CourseName" name="CourseName" value={CourseName} onChange={(e) => setCourseName(e.target.value)} required />

                <label>Description:</label>
                <input type="text" id="Description" name="Description" value={Description} onChange={(e) => setDescription(e.target.value)} required />

                <label>Create Date:</label>
                <input type="date" id="CreateDate" name="CreateDate" value={CreateDate} onChange={(e) => setCreateDate(e.target.value)} required />
                {PhotoFileName != '' &&
                      <img width="250px" height="250px"
                        src={PhotoPath + PhotoFileName} />
                    }
                <label>Image:</label>
                <input type="file" id="Image" name="Image"  onChange={imageUpload} required />

                <button type="submit" id="submit" name="submit" className="btn-btn">Add</button>
                <button type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardAddCourse;