import React from "react";
import Table from "./Table";

const TableListClassTeacher = () => {

    const columns = [
        {
            Header: 'Course Name',
            accessor: 'courseName',
        },
        {
            Header: 'Course ID',
            accessor: 'courseId',
        }
    ];

    const data = [
        {
            courseName: "course 1",
            courseId: "1"
        },
        {
            courseName: "course 1",
            courseId: "2"
        },
        {
            courseName: "course 1",
            courseId: "3"
        },
    ];
    return(
        <Table columns={columns} data={data}/>
    );
}

export default TableListClassTeacher;