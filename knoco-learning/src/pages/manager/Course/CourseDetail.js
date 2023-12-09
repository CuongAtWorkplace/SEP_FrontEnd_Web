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
  const [PhotoPath, setPhotoPath] = useState('https://localhost:7169/Photos/');
  const { cid } = useParams();
  const [checkValidation, setcheckValidation] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:7169/api/Course/GetClassInCourse?courseId=${cid}`)
      .then((response) => response.json())
      .then((data) => {
        setClassInCourse(data);
      });
    fetch(`https://localhost:7169/api/Course/GetCourseById?courseId=${cid}`)
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
    if (value.length < 0) {
      toast.error("Update failed. Try Again!!!");
      setcheckValidation(false);
    } else {
      setcheckValidation(true);
      setCourseName(value)
      // Gọi API ở đây nếu validation thành công
    }

  };

  const handleDescriptionChange = (e) => {

    const value = e.target.value;
    const regex = /^[a-zA-Z0-9\s]+$/;
      if (value.trim() === '') {
    toast.error("Update failed. Try Again!!!");
    setcheckValidation(false);
  } else if (regex.test(value)) {
    setcheckValidation(true);
    setDescription(value);
  
  
  }
  };


  const handleImageChange = () => {
    setShowModal(false);
  };

  const handleRowClick = (courseId) => {
    console.log("Clicked on row with ID:", courseId);
  };

  const NewCourse = () => {

    if (checkValidation == true) {
      const coursenew = {
        courseId: cid,
        courseName: courseName,
        description: description,
        createDate: createDate,
        image: PhotoFileName,
        isDelete: false
      };
      fetch('https://localhost:7169/api/Course/UpdateCourse', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coursenew),
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Update successfull. Congratulation!!!")

          }
          else if (!response.ok) {
            toast.error("Update failed. Try Again!!!")
            throw new Error('Failed to add product');
          }

        })
    }

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
              <form className="">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Thông Tin Khóa Học</h4>
                </div>
                <div className="row mt-4">
                  <div className="col-md-7">
                    <label className="labels">Tên Khóa Học</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
                      placeholder={courseDetail.courseName}
                      value={courseName}
                      onChange={handleCourseNameChange}
                    />
                  </div>
                  <div className="col-md-7">
                    <label className="labels">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={courseDetail.description}
                      value={description}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Image</label>

                    {PhotoFileName != '' &&
                      <img width="250px" height="250px"
                        src={PhotoPath + PhotoFileName} />
                    }
                  </div>
                  <div className="col-md-7">
                    <input class="form-control" className="m-2" type="file" onChange={imageUpload} />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button type="button" onClick={NewCourse} className=" btn btn-block mybtn btn-primary tx-tfm">Thay Đổi</button>
                </div>
              </form>
            </div>
            <div className="">
              <div className="">
                <h1>Danh sách lớp</h1>
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
