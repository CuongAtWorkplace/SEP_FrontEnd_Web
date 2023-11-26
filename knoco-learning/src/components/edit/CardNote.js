import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myImage from '../../assets/profile.jpg';
import '../../style/Teacher/Edit.css'
import jwtDecode from "jwt-decode";

const CardNote = ({ closePopup }) => {
    const UserID = 2;
    const [userDt, setUserDt] = useState({});
    const [imageSource, setImage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const params = useParams();
    const [noteTeacher, setNoteTeacher]= useState([]);
    const [textAreaValue, setTextAreaValue] = useState('');
    const [userId , setUserId] = useState('');
  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };
    useEffect(() => {
        fetchDataNote();
       
    }, []);

    const fetchDataNote = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/NoteTeacher/GetNoteInClass?classId=${params.classId}`); 
            const responseData = await response.json();
            setNoteTeacher(responseData);
           
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp học:', error);
        }
    };
    const handleSubmitNote = async (e) => {
        if(textAreaValue.trim() === ''){
             alert("không được để trống");
             return;
        }else{
            const token = localStorage.getItem("token");
            console.log(token);
           
              const decodedToken = jwtDecode(token);
              setUserId(decodedToken.userid);
         
          const currentDate = new Date().toISOString();
            const NoteNew = {
                userId: decodedToken.userid,
                classId: params.classId,
                content: textAreaValue,
                createDate: currentDate,
                
            };
    
            e.preventDefault();
            try {
                const response = await fetch(`https://localhost:7169/api/NoteTeacher/AddNewNoteTeacher`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(NoteNew)
                });
                if (response.ok) {
                    console.log('Dữ liệu lớp học đã được cập nhật thành công');
                   fetchDataNote();
                  setTextAreaValue('');
                } else {
                    console.error('Lỗi khi cập nhật dữ liệu lớp học:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Lỗi khi cập nhật dữ liệu lớp học:', error);
            }
        }
        
    };



    const fetchImage = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/User/GetUserImage/GetImage/${UserID}`);
            if (response.ok) {
                const imageData = await response.blob();
                setImage(URL.createObjectURL(imageData));
            }
        } catch (error) {
            console.error('Lỗi khi lấy ảnh:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {

        // const userUpdate = {
        //     userId: userDt.userId,
        //     image: imageSource,
        // };

        e.preventDefault();

        if (!selectedImage) {
            console.error('Vui lòng chọn ảnh');
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await fetch(`https://localhost:7169/api/User/UploadImage/UploadImage/${UserID}`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                console.log('Hình ảnh đã được tải lên thành công');
                closePopup();
                window.location.reload();
            } else {
                console.error('Lỗi khi tải lên hình ảnh:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Lỗi khi tải lên hình ảnh:', error);
        }
    };

    return (
        <div className="card-edit-class">
            <form onSubmit={handleSubmitNote}>
                <h2>Note</h2>
               

                {noteTeacher.map((note,index)=>(
                    <div key={index}>
                        <h3>
                            {note.createDate} -
                            {note.content}
                        </h3>
                    </div>
                ))} 
              <textarea value={textAreaValue} onChange={handleTextAreaChange}></textarea>
                <button type="submit" id="submit" name="submit" className="btn-btn">Note</button>
                <button type="button" onClick={closePopup} className="btn-btn">Cancel</button>
            </form>
        </div>
    );
};

export default CardNote;