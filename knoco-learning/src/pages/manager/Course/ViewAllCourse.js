import React, { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import SideBar from "../../../components/sidebar/SideBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import TableListClassTeacher from "../../../components/Table/TableListClassTeacher";
import "./ViewAllCourse.scss";
class ViewAllCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListAllCourse: [],
        }
    }

    refreshListByGenre() {
        fetch(`https://localhost:7169/api/Course/GetAllCourse`)
            .then(response => response.json())
            .then(data => {
                this.setState({ ListAllCourse: data });
            });
    }
    componentDidMount() {
        this.refreshListByGenre();
    };
    render() {
        const { ListAllCourse } = this.state;

        const columns = [
            // Định nghĩa cấu trúc cột cho DataGrid

            { field: 'courseId', headerName: 'ID', width: 70 },
            { field: 'courseName', headerName: 'Name', width: 150 },
            { field: 'description', headerName: 'Description', width: 250 },
            { field: 'createDate', headerName: 'CreateDate', width: 250 },
            { field: 'image', headerName: 'Image', width: 250 },
            { field: 'isDelete', headerName: 'isDelete', width: 250 },
        ];
        const getRowId = (row) => row.courseId;
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

                        <div>
                             <div className='TableLayout' style={{ height: 'auto', width: '100%' }}> 
                                <DataGrid
                                    rows={ListAllCourse} // Sử dụng dữ liệu từ state
                                    columns={columns}
                                    pageSize={5}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                    getRowId={getRowId}
                                />
                             </div> 
                        </div>

                        <footer>
                            <Footer />
                        </footer>
                    </section>
                </div>


            </div>
        )
    }
}
export default ViewAllCourse;
