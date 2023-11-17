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
import SideBar from "../../../components/sidebar/SideBar";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

function CourseDetail() {
  const [courseDetail, setCourseDetail] = useState({});
  const [classInCourse, setClassInCourse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [PhotoFileName, setPhotoFileName] = useState('');
  const [ImageCover, setImageCover] = useState('');
  const [PhotoPath, setPhotoPath] = useState('https://localhost:7169/Photos/');
  const { cid } = useParams();

  useEffect(() => {
    fetch(`https://localhost:7169/api/Course/GetCourseById?courseId=${cid}`)
      .then((response) => response.json())
      .then((data) => {
        setCourseDetail(data);
        setPhotoFileName(data.image);
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
    setCourseName(e.target.value)
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
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
      courseId: cid,
      courseName: courseName,
      description: description,
      createDate: new Date().toISOString().slice(0, 16),
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

        }
        else if (!response.ok) {
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
                <div className="row mt-2">
                  <div className="col-md-12">
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
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={courseDetail.description}
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Image</label>
                    {/* <input
                          type="text"
                          className="form-control"
                          placeholder={courseDetail.image}
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        /> */}
                    {PhotoFileName != '' &&
                      <img width="250px" height="250px"
                        src={PhotoPath + PhotoFileName} />
                    }
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Hình ảnh</label>
                    <input className="m-2" type="file" onChange={imageUpload} />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button style={{ width: "100%" }} type="button" onClick={NewCourse} className=" btn btn-block mybtn btn-primary tx-tfm">Thay Đổi</button>
                </div>
              </form>
            </div>
            <div className="classListInCourse">
              <div className="TableLayout">
                <h1>Danh sách lớp</h1>
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

          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <section className="panel tasks-widget">
                  <header className="panel-heading">
                    <h2>Update Topic</h2>
                  </header>
                </section>
                <div className="panel-body">
                  <form>
                    <div className="form-group">
                      <label className="control-label">Topic Name:</label>
                      {/* <input name="ProductPrice" className="form-control" value={TopicName} onChange={(e) => this.onChangeTopicName(e)} /> */}
                    </div>

                    <div className="form-group">
                      <label className="control-label">Topic Description:</label>
                      <div className="App">
                        {/* <CKEditor
                                            editor={ClassicEditor}
                                            data={Description}
                                            onReady={editor => {
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                this.setState({ Description: data })
                                            }}
                                        /> */}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="control-label">Topic Categories:</label> <br></br>
                      {/* <select className="form-select"
                                        onChange={(e) => this.setState({GenreId: e.target.value})
                                        } 
                                        value={GenreId}
                                    >
                                        {Genre.map(gen => <option value={gen.id} key={gen.id}>
                                            {gen.genreName}
                                        </option>)}
                                    </select> */}
                    </div>
                    <div className="form-group">
                      <label className="control-label">Assign To Writer:</label>
                      {/* <select className="form-select"
                                        onChange={(e) => this.setState({ WriterId: e.target.value })}
                                        value={WriterId}
                                    >
                                        {User.map(u => u.roleId == 4 && 
                                            <option value={u.id} key={u.id} selected>
                                                {u.fullName}
                                            </option> 
                                        )}
                                    </select> */}
                      {/* {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>} */}
                    </div>
                    <div className="form-group">
                      <label className="control-label">Assign To Reporter:</label>
                      {/* <select className="form-select"
                                        onChange={(e) => this.setState({ReporterId: e.target.value})}
                                        value={ReporterId}
                                    >
                                        {User.map(u => u.roleId == 5 &&
                                            <option value={u.id} key={u.id} >
                                                {u.fullName}
                                            </option>
                                        )}
                                    </select> */}
                      {/* {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>} */}
                    </div>
                    <div className="form-group">
                      <label className="control-label">Create Date:</label>
                      {/* <input type="datetime-local" className="form-control" value={StartDate} onChange={(e) => this.setState({StartDate: e.target.value})} /> */}
                      {/* {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>} */}
                    </div>
                    <div className="form-group">
                      <label className="control-label">EndDate:</label>
                      {/* <input type="datetime-local" className="form-control" value={EndDate} onChange={(e) =>  this.setState({EndDate: e.target.value})}/> */}
                      {/* {ErrorTopicName == null ? <input type="hidden" /> : <p style={{ color: 'red' }}>{ErrorTopicName}</p>} */}
                    </div> <br />
                    {/* <button type="button" className="btn btn-info" onClick={() => this.updateClick()}>Update AssignTask</button> */}
                  </form>
                </div>
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
