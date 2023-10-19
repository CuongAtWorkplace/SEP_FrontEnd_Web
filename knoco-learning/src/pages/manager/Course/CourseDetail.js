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

import "./ViewAllCourse.scss";

function CourseDetail() {
  const [courseDetail, setCourseDetail] = useState({});
  const [classInCourse, setClassInCourse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');


  const { cid } = useParams();

  useEffect(() => {
    fetch(`https://localhost:7169/api/Course/GetCourseById?courseId=${cid}`)
      .then((response) => response.json())
      .then((data) => {
        setCourseDetail(data);
      });

    fetch(`https://localhost:7169/api/Course/GetClassInCourse?courseId=${cid}`)
      .then((response) => response.json())
      .then((data) => {
        setClassInCourse(data);
      });
  }, [cid]);

  const columns = [
    { field: "classId", headerName: "ID", width: 70 },
    { field: "className", headerName: "Class Name", width: 150 },
  ];

  const getRowId = (row) => row.courseId;

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCourseNameChange = (e) => {
    setDescription(e.target.value)
  };

  const handleDescriptionChange = () => {
    setShowModal(false);
  };
  const handleImageChange = () => {
    setShowModal(false);
  };

  const handleRowClick = (courseId) => {
    console.log("Clicked on row with ID:", courseId);
  };

  const NewCourse = () => {
    // const token = localStorage.getItem("token");
    // const decodedToken = jwtDecode(token);
    // const cBy = decodedToken.id;
 
    const coursenew = {
      courseId : cid,
      courseName: courseName,
      description: description,
      createDate: new Date().toISOString().slice(0, 16),
      image: image,
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
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        return response.json();
      })
  };
  const handleSearchChange = (e) => {
    const searchText = e.target.value;

    // Perform your search/filter logic here and update the state as needed

    setSearchText(searchText);
  };

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
                <div className="">
                  <div className="">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-right">Thông Tin Khóa Học</h4>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Tên Khóa Học</label>
                        <input
                          type="text"
                          className="form-control"
                          required=""
                          value={courseDetail.courseName}
                          onChange={handleCourseNameChange}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <label className="labels">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          value={courseDetail.description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Image</label>
                        <input
                          type="text"
                          className="form-control"
                          value={courseDetail.image}
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Nút Xóa</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <button style={{ width: "100%" }} type="button" onClick={NewCourse} className=" btn btn-block mybtn btn-primary tx-tfm">Thay Đổi</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="coursedetail">
              <h1>Danh sách lớp</h1>
              <div className="TableLayout" style={{ height: "auto", width: "100%" }}>
                <DataGrid
                  rows={classInCourse}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableRowSelectionOnClick
                  getRowId={getRowId}
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
