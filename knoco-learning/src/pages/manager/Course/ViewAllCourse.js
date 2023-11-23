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

import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { BsSuitHeartFill, BsBookmarkPlusFill } from "react-icons/bs";
// import { Modal, Button } from 'react-bootstrap';


import "./ViewAllCourse.css";
import TableListCourse from "../../../components/Table/TableListCourse";


class ViewAllCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListAllCourse: [],
            originalData: [],
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

    refreshListByGenre() {
        fetch(`https://localhost:7169/api/Course/GetAllCourse`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    originalData: data,
                    ListAllCourse: data
                });
            });
    }
    handleShow = () => {
        this.setState({ showModal: true })
    }
    handleClose = () => {
        this.setState({ showModal: false });
    }
    componentDidMount() {
        this.refreshListByGenre();
    };

    handleRowClick = (courseId) => {
        window.location.href = `/coursedetail/${courseId}`;
        // Lấy ID của hàng được click và xử lý nó
     
        // const clickedRowId = params.row.courseId;
        // fetch(`https://localhost:7169/api/Course/GetCourseById?courseId=${clickedRowId}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({
        //             courseId: data.courseId,
        //             courseName: data.courseName,
        //             Description: data.Description,
        //             CreateDate: data.CreateDate,
        //             Image: data.Image,
        //         });
        //     });

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
        const { ListAllCourse, showModal, searchText ,courseId,courseName,Description,CreateDate,Image} = this.state;
        console.log(courseName);


        const columns = [
            // Định nghĩa cấu trúc cột cho DataGrid

            { field: 'courseId', headerName: 'ID', width: 70 },
            { field: 'courseName', headerName: 'Name', width: 150 },
            { field: 'description', headerName: 'Description', width: 250 },
            { field: 'createDate', headerName: 'CreateDate', width: 250 },
            { field: 'image', headerName: 'Image', width: 250 },
            { field: 'isDelete', headerName: 'isDelete', width: 250 },
            { field: 'edit', headerName: 'Sửa', width: 100 , 
            renderCell: (params) => (
                <div>
                  <BsBookmarkPlusFill size={20} color="red" onClick={() => this.handleRowClick(params.row.courseId)}/>
                </div>
              ),
            },
        ];
        const getRowId = (row) => row.courseId;

        return (

            <div>
                <div className="body_page" >
                    <section id="menu">
                        <div className="logo">
                            <FontAwesomeIcon className="logo-icon" icon={faBook} />
                            <a onClick={this.handleShow}>Knoco</a>

                        </div>
                        <nav>
                            <SideBar />

                        </nav>
                    </section>

                    <section id="interface">
                        <header>

                            <div className="navigation">
                                <div className="n1">
                                    <div>
                                        <FontAwesomeIcon id="menu-btn" icon={faBars} />
                                    </div>
                                    <div className="search">
                                        <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
                                        <input type="text" onChange={this.handleSearchChange} placeholder="Search" />
                                    </div>
                                </div>

                                {/* <div className="profile">
                <FontAwesomeIcon className="icon-profile" icon={faBell} />
                <FontAwesomeIcon className="icon-img" icon={faChalkboardUser} onClick={toggleDropdown} />
                <div className={`dropdown-menu ${isDropdownVisible ? "active" : ""}`} id="dropdown-menu">
                    <ul>
                        <li><Link className="link-a" to="#">Change Password</Link></li>
                        <li><Link className="link-a" to="#">Log Out</Link></li>
                    </ul>
                </div>
            </div> */}
                            </div>
                        </header>


                        <div>
                            <input
                                type="text"
                                value={searchText}
                                onChange={this.handleSearchChange}
                                placeholder="Search Name Course"
                            />
                            <div className='TableLayout' style={{ height: 'auto', width: '100%' }}>

                                <DataGrid
                                    rows={ListAllCourse} // Sử dụng dữ liệu từ state
                                    columns={columns}
                                    pageSize={5}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                    getRowId={getRowId}
                                    //  onRowClick={this.handleRowClick}
                                />
                            </div>
                        </div>

                        <footer>
                            <Footer />

                        </footer>
                    </section>
                   
                </ div>




            </div>
        )
    }
}
export default ViewAllCourse;
