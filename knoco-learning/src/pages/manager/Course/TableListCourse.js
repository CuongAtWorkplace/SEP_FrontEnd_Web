import React from "react";
import Table from "../../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import CardAddCourse from "../../../components/add/CardAddCourse";
import { API_BASE_URL } from "../../../paths";
import jwtDecode from "jwt-decode";
const ColumnFilter = ({ column }) => {
    const { setFilter } = column;
    return (
        <input
            type="text"
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Filter ${column.Header}`}
        />
    );
};
const handleSearchChange = (e) => {
    const { originalData } = this.state;
    const searchText = e.target.value;

    const filteredCourses = originalData.filter(course =>
        course.courseName.toLowerCase().includes(searchText.toLowerCase())
    );

    this.setState({ searchText, data: filteredCourses });
}
const TableListCourse = () => {
    const [isManager, setisManager] = useState(false);
    const [data, setData] = useState([]);
    const [AddCoursePopupVisible, setAddCoursePopupVisible] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        if (Number(decodedToken.roleid == 3)) {
            setisManager(true);
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/Course/GetAllCourse`);
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const openAddCoursePopup = () => {
        setAddCoursePopupVisible(true);
    }

    const closeAddCoursePopup = () => {
        setAddCoursePopupVisible(false);
    }
    const navigate = useNavigate();

    function formatAPIDate(apiDate) {
        return new Date(apiDate).toLocaleDateString('en-US');
    }

    const columns = [
        {
            Header: 'ID',
            accessor: 'courseId',
            Filter: ColumnFilter, // Custom filter component for courseName column
        },
        {
            Header: 'Course Name',
            accessor: 'courseName',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Description',
            accessor: 'description',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'CreateDate',
            accessor: 'createDate',
            Filter: ColumnFilter, // Custom filter component for courseId column
            Cell: ({ row }) => (
                <div>
                    {formatAPIDate(row.original.createDate)}
                </div>
            ),
        },
        {
            Header: 'Image',
            accessor: 'image',
            Filter: ColumnFilter, // Custom filter component for courseId column
            Cell: ({ value }) => (
                <img
                    src={`${API_BASE_URL}/Photos/${value}`} // Assuming 'value' is the image filename or path
                    alt="Course Image"
                    style={{ width: '50px', height: '50px' }} // Adjust the size as needed
                />
            ),
        },
    ];

    const handleRowClick = (row) => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        if (isManager == true) {
            navigate(`/coursedetail/${row.courseId}`);
            console.log('Đã click vào hàng có IDdddddd:', row.courseId);
        } else if (Number(decodedToken.roleid === 4)) {
            console.log('Đã click vào hàng có ID:', row.courseId);
        }

    };
    return (
        <div>


            {isManager == true &&
                <button className="btn-add" onClick={openAddCoursePopup}>New Course</button>
            }
            <Table columns={columns} data={data} onRowClick={handleRowClick} />
            {
                AddCoursePopupVisible && (
                    <div className="popup">
                        <CardAddCourse closePopup={closeAddCoursePopup} />
                    </div>
                )
            }
        </div>
    )
}

export default TableListCourse;