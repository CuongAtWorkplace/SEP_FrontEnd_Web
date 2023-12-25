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
import { withRouter } from "react-router-dom";
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
            IsDelete: false,
            roleid: "",
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
            this.setState({ roleid: Number(decodedToken.roleid) });
            if ((Number(decodedToken.roleid) !== 3 && Number(decodedToken.roleid) !== 4) || localStorage.getItem("token") === '') {
                window.location.href = "/";
            }
        }else{
            window.location.href = "/";
        }
        this.refreshListByGenre();

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
        const { ListAllCourse, showModal, searchText, courseId, courseName, Description, CreateDate, Image } = this.state;

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

                            <TableListCourse />
                        </div>

                        <footer>
                            <Footer />
                        </footer>
                    </section>
                </ div>
            </div>

        );
    }

}
export default ViewAllCourse;
