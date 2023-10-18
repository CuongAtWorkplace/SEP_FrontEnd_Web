import React, { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import TableListClassTeacher from "../../../components/Table/TableListClassTeacher";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
//import { withRouter } from "react-router-dom";
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { BsSuitHeartFill, BsBookmarkPlusFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import { Modal, Button } from 'react-bootstrap';
import "./ViewAllCourse.scss";

class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CourseDetail: {},
            classInCourse: [],
            showModal: false,
            searchText: "",
            courseId: "",
            courseName: "",
            Description: "",
            CreateDate: "",
            Image: "",
            IsDelete: false
        }
    }

    CourseDetail() {

        fetch(`https://localhost:7169/api/Course/GetCourseById?courseId=1`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    CourseDetail: data,
                });
            });
    }

    classInCourse() {
        const { cid } = this.props.match.params;
        fetch(`https://localhost:7169/api/Course/GetClassInCourse?courseId=1`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    classInCourse: data,
                });
            });
    }

    UpdateCourse = async () => {


        const { } = this.state;
        try {
            const response = await fetch(``, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (response.ok) {

                window.location.href = "/coursedetail";
            } else {

            }
        } catch (error) {
            // Xử lý lỗi gọi API
            console.log('Lỗi gọi API', error);
        }

    };

    handleShow = () => {
        this.setState({ showModal: true })
    }
    handleClose = () => {
        this.setState({ showModal: false });
    }
    componentDidMount() {
        this.CourseDetail();
        this.classInCourse();
    };

    handleRowClick = (courseId) => {

        console.log('Đã click vào hàng có ID:', courseId);
    };
    handleSearchChange = (e) => {
        const { originalData } = this.state;
        const searchText = e.target.value;

        const filteredCourses = originalData.filter(course =>
            course.courseName.toLowerCase().includes(searchText.toLowerCase())
        );


        this.setState({ searchText, ListAllCourse: filteredCourses });
    }


    render() {

        const { CourseDetail, classInCourse } = this.state;


        const columns = [
            // Định nghĩa cấu trúc cột cho DataGrid

            { field: 'classId', headerName: 'ID', width: 70 },
            { field: 'className', headerName: 'Clas Name', width: 150 },
        ];
        const getRowId = (row) => row.courseId;
        // const { cid } = this.props.match.params;
        // console.log(cid);
        return (

            <div>
                <div className="body_page" >
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
                            <div >
                                <form >
                                   
                                    <div class="col-md-8 ">
                                        <div class="">
                                            {/* {notiU == false &&
                                                <h3>Thông tin tài khoản chưa chính sác</h3>
                                            } */}
                                            <div class="d-flex justify-content-between align-items-center mb-3">
                                                <h4 class="text-right">Thông Tin Tài Khoản</h4>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-12"><label class="labels">Tên Khóa Học</label><input type="text" class="form-control" required="" value={CourseDetail.courseName} /></div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-12"><label class="labels">Description</label><input type="text" class="form-control" value={CourseDetail.description} /></div>
                                                <div class="col-md-12"><label class="labels">Image</label><input type="text" class="form-control" value={CourseDetail.image} /></div>
                                                <div class="col-md-12"><label class="labels">Nút Xóa </label><input type="text" class="form-control" /></div>
                                            </div>

                                            <div class="mt-5 text-center"><button class="btn btn-primary profile-button" onClick={this.UpdateProfile} type="button">Thay đổi thông tin</button></div>
                                        </div>

                                    </div>
                                    
                                </form>
                                <div class="col-md-4 ">
                                        <h1>danh sách lớp</h1>
                                        <div className='TableLayout' style={{ height: 'auto', width: '50%' }}>

                                            <DataGrid
                                                rows={classInCourse} // Sử dụng dữ liệu từ state
                                                columns={columns}
                                                pageSize={5}
                                                checkboxSelection
                                                disableRowSelectionOnClick
                                                getRowId={getRowId}
                                            //  onRowClick={this.handleRowClick}
                                            />
                                        </div>
                                    </div>
                            </div>

                        </div>

                        <footer>
                            <Footer />
                        </footer>
                    </section>
                    {/* <Modal
                        show={showModal}
                        onClose={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-body">
                                <div className="login_wrapper">
                                    <form >
                                        <div class="formsix-pos">
                                            <div className="form-group i-email">
                                                <input type="text" class="form-control" required="" id="" value={this.state.courseId}
                                                    placeholder="Course Id" />
                                            </div>
                                        </div>
                                        <div class="formsix-pos">
                                        <div className="form-group i-email">
                                            <input type="text" class="form-control" required="" id="email2" 
                                                placeholder="" />
                                        </div>
                                    </div>
                                    <div class="formsix-pos">
                                        <div className="form-group i-email">
                                            <input type="text" class="form-control" required="" id="email2" 
                                                placeholder="" />
                                        </div>
                                    </div>
                                    <div class="formsix-pos">
                                        <div className="form-group i-email">
                                            <input type="text" class="form-control" required="" id="email2" 
                                                placeholder="" />
                                        </div>
                                    </div>
                                    <div className="formsix-e">
                                        <div className="form-group i-password">
                                            <input type="text" className="form-control" required="" id="password2" 
                                                 placeholder="" />
                                        </div>
                                    </div>

                                        <div class="login_btn_wrapper">
                                            <button style={{ width: "100%" }} type="button" onClick={this.handleClose} className=" btn btn-block mybtn btn-primary tx-tfm">Thêm</button>
                                        </div>
                                    </form>


                                </div>
                            </div>


                        </Modal.Body>

                    </Modal> */}
                </ div>




            </div>
        )
    }
}
//export default withRouter(CourseDetail);
export default CourseDetail;
