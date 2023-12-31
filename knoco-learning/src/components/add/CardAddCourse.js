import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../style/Teacher/Edit.css';
import { API_BASE_URL } from "../../paths";
const CardAddCourse = ({ closePopup }) => {
    const params = useParams();
    const [CourseId, setCourseId] = useState('');
    const [CourseName, setCourseName] = useState('');
    const [Description, setDescription] = useState('');
    const [CreateDate, setCreateDate] = useState('');
    const [ImageCover, setImageCover] = useState('');
    const [IsDelete, setIsDelete] = useState(false);
    const [PhotoFileName, setPhotoFileName] = useState('');
    const [PhotoPath, setPhotoPath] = useState(`${API_BASE_URL}/Photos/`);
    const currentDate = new Date();

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    const handleSubmit = async (e) => {

        const newcourse = {
            courseName: CourseName,
            description: Description,
            createDate: currentDate,
            image: PhotoFileName,
            IsDelete: false
        };

        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/Course/AddNewCouse`, {
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

        fetch(`${API_BASE_URL}/api/Post/SaveFile`, {
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
            <form onSubmit={handleSubmit} style={{width : '500px'}}>
                <h2>New Course</h2>
                <div className="form-group">
                    <label className="control-label">Course Name:</label>
                    <input class="form-control" type="text" id="CourseName" name="CourseName" value={CourseName} onChange={(e) => setCourseName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label className="control-label">Description:</label>
                    <input class="form-control" type="text" id="Description" name="Description" value={Description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                {PhotoFileName != '' &&
                    <img width="250px" height="250px"
                        src={PhotoPath + PhotoFileName} />
                }
                <label>Image:</label>

                <input class="form-control" type="file" id="Image" name="Image" onChange={imageUpload} required />

                <button type="submit" id="submit" name="submit" className="btn-btn">Add</button>
                <button type="button" onClick={closePopup} className="btn-  btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardAddCourse;