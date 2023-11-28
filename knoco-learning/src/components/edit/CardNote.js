import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myImage from '../../assets/profile.jpg';
import '../../style/Teacher/Edit.css'
import jwtDecode from "jwt-decode";
import { toast} from 'react-toastify';
const CardNote = ({ closePopup }) => {
    const params = useParams();
    const [noteTeacher, setNoteTeacher] = useState([]);
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    // const handleTextAreaChange = (event) => {
    //     setTextAreaValue(event.target.value);
    // };

    useEffect(() => {
        fetchDataNote();
        // setTimeout(() => {
        //     localStorage.removeItem('token');
        //     console.log('da xoa token.');
        //   }, 30 * 1000);
       
    }, []);

    const fetchDataNote = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/NoteTeacher/GetNoteInClass?classId=${params.classId}`);
            const responseData = await response.json();
            setNoteTeacher(responseData);
            setContent(responseData.content || '');
            console.log(responseData.content);
            

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };

    const handleSubmitNote = async (e) => {
        if (content.trim() === '') {
            alert("không được để trống");
            return;
        } else {
            const token = localStorage.getItem("token");
            console.log(token);

            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.userid);
            console.log(noteTeacher.noteId);
            console.log(decodedToken.userid);
            console.log(params.classId);
            console.log(content);

            const NoteNew = {
                noteId: noteTeacher.noteId,
                userId: decodedToken.userid,
                classId: params.classId,
                content: content
            };

            e.preventDefault();
            try {
                const response = await fetch(`https://localhost:7169/api/NoteTeacher/UpdateNoteTeachers`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(NoteNew)
                });
                if (response.ok) {
                    toast.error("Save successful!!!")
                    console.log('Dữ liệu lớp học đã được cập nhật thành công');
                    closePopup();
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
            <form onSubmit={handleSubmitNote}>
                <h2>Note</h2>
                {/* {noteTeacher.map((note, index) => (
                    <div key={index}>
                        <span>{formatDate(note.createDate)}</span>
                        <h3>{note.content}</h3>
                    </div>
                ))} */}
                <textarea className="textarea-note" id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
                <button type="submit" id="submit" name="submit" className="btn-btn">Save</button>
                <button type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardNote;