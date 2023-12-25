import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import TableListClassTeacher from "../../../components/Table/TableListClassTeacher";

import Modal from "react-bootstrap/Modal";
import { Link, useParams } from "react-router-dom";

import { memo } from "react";

//import { withRouter } from "react-router-dom";
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { BsSuitHeartFill, BsBookmarkPlusFill } from "react-icons/bs";

import { Routes, Route } from "react-router-dom";
// import { Modal, Button } from 'react-bootstrap';

import "./ViewAllCourse.css";
import { Table } from "reactstrap";
// import SideBar from "../../../components/sidebar/SideBar";
// import Header from "../../../components/header/Header";
// import Footer from "../../../components/footer/Footer";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { API_BASE_URL } from "../../../paths";
function CourseDetail() {
  const [courseDetail, setCourseDetail] = useState({});
  const [classInCourse, setClassInCourse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [createDate, setCreateDate] = useState('');
  const [image, setImage] = useState('');
  const [PhotoFileName, setPhotoFileName] = useState('');
  const [ImageCover, setImageCover] = useState('');
  const [PhotoPath, setPhotoPath] = useState(`${API_BASE_URL}/Photos/`);
  const { cid } = useParams();
  const [checkValidation, setcheckValidation] = useState(false);
  const [roleid, setRoleid] = useState('');
  const navigate = useNavigate();
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      setRoleid(decodedToken.roleid);
      if (Number(decodedToken.roleid) === 2 || localStorage.getItem("token") === '') {
          navigate(`/`);
      }
    } else {
      navigate(`/`);
    }
    fetch(`${API_BASE_URL}/api/Course/GetClassInCourse?courseId=${cid}`)
      .then((response) => response.json())
      .then((data) => {
        setClassInCourse(data);
      });
    fetch(`${API_BASE_URL}/api/Course/GetCourseById?courseId=${cid}`)
      .then((response) => response.json())
      .then((data) => {
        setCourseDetail(data);
        setPhotoFileName(data.image);
        setCourseName(data.courseName);
        setDescription(data.description);
        setCreateDate(data.createDate);
      });


  }, [cid]);


  const columns = [
    {
      Header: 'Class Id',
      accessor: 'classId',
    },
    {
      Header: 'Class Name',
      accessor: 'className',
    }
  ];

  const getRowId = (row) => row.courseId;

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCourseNameChange = (e) => {
    const value = e.target.value;
    setCourseName(value)
    // Gọi API ở đây nếu validation thành công
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };


  const handleImageChange = () => {
    setShowModal(false);
  };

  const handleRowClick = (courseId) => {
    console.log("Clicked on row with ID:", courseId);
  };

  const NewCourse = async (e) => {


    const coursenew = {
      courseId: cid,
      courseName: courseName,
      description: description,
      createDate: createDate,
      image: PhotoFileName,
      isDelete: false
    };
    fetch(`${API_BASE_URL}/api/Course/UpdateCourse`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coursenew),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Update course successfull. Congratulation!!!")
        }
        else if (!response.ok) {
          toast.error("Update course failed. Try Again!!!")
          throw new Error('Failed to add product');
        }

      })


  };
  const handleSearchChange = (e) => {
    const searchText = e.target.value;

    // Perform your search/filter logic here and update the state as needed

    setSearchText(searchText);
  };
  const imageUpload = (e) => {
    e.preventDefault();

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
    <div>
      <div className="body_page">
        <section id="menu">
          <div className="logo">
            <FontAwesomeIcon className="logo-icon" icon={faBook} />
            <h1>Knoco</h1>
          </div>
          <nav>
            <SideBar />
          </nav>
        </section>

        <section id="interface">
          <header>
            <Header />
          </header>
          <div className="children">
            <div className="coursedetail">
              <form onSubmit={NewCourse} style={{ width: "70%" }}>
                <div className="form-group">
                  <label className="control-label">Course Name:</label>
                  <input class="form-control" type="text" name="ClassName" placeholder={courseDetail.courseName} value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="control-label">Description:</label>
                  <input class="form-control" type="text" name="description" placeholder={courseDetail.description} value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="control-label">Image :</label>

                  {PhotoFileName != '' &&
                    <img width="250px" height="250px"
                      src={PhotoPath + PhotoFileName} />
                  }
                </div>
                <div className="form-group">
                  <input class="form-control" className="m-2" type="file" onChange={imageUpload} /> </div>
                <button type="submit" id="submit" name="submit" className="btn-btn">Edit</button>
              </form>
            </div>

            <div className="list-class-mng">
              <h1>List class in course</h1>
              {classInCourse.map((comment, index) => (
                <div key={index} className="comment">
                  <strong>{comment.className}</strong>  <span className="edit-comment">

                  </span>
                </div>
              ))}
              <Table
                columns={columns}
                data={classInCourse}
              />
            </div>
          </div>
          <footer>
            <Footer />
          </footer>
        </section>
      </div>
    </div>
  );
}


export default CourseDetail;
