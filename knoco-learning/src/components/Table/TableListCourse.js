import React from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

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
    const [  searchText , setSearchText]=useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://localhost:7169/api/Course/GetAllCourse`);
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const navigate = useNavigate();
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
        },
        {
            Header: 'Image',
            accessor: 'image',
            Filter: ColumnFilter, // Custom filter component for courseId column
            Cell: ({ value }) => (
                <img
                  src={`https://localhost:7169/Photos/${value}`} // Assuming 'value' is the image filename or path
                  alt="Course Image"
                  style={{ width: '50px', height: '50px' }} // Adjust the size as needed
                />
              ),
        },
    ];
    
    const handleRowClick = (row) => {
        console.log('Clicked row data:', row);
        navigate(`/coursedetail/${row.courseId}`);
    };
    return (
        <div>
            <Table columns={columns} data={data} onRowClick={handleRowClick} />
        </div>
    )
}

export default TableListCourse;