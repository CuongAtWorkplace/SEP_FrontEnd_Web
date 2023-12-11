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
import { useNavigate } from "react-router-dom";
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { BsSuitHeartFill, BsBookmarkPlusFill } from "react-icons/bs";
// import { Modal, Button } from 'react-bootstrap';
import jwtDecode from "jwt-decode";
import "./ViewAllCourse.css";
import TableListCourse from "./TableListCourse";
import { API_BASE_URL } from "../../../paths";

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
        fetch(`${API_BASE_URL}/api/Course/GetAllCourse`)
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
       
        const token = localStorage.getItem("token");
        if (token !== null) {
            const decodedToken = jwtDecode(token);
           
            if (Number(decodedToken.roleid) !== 3 || localStorage.getItem("token") === '') {
               window.location.href="/";
            }
        }
        this.refreshListByGenre();
       
    };

    handleRowClick = (courseId) => {
        window.location.href = `${API_BASE_URL}/coursedetail/${courseId}`;
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
                        <Header />
                        </header>

                        <div className="children">
                            
                         <TableListCourse/>
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
