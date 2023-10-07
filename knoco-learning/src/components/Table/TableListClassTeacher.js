import React from "react";
import Table from "./Table";
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

const TableListClassTeacher = () => {

    const columns = [
        {
          Header: 'Course Name',
          accessor: 'courseName',
          Filter: ColumnFilter, // Custom filter component for courseName column
        },
        {
          Header: 'Course ID',
          accessor: 'courseId',
          Filter: ColumnFilter, // Custom filter component for courseId column
        },
      ];

    const data = [
        {
            courseName: "course 1",
            courseId: "1"
        },
        {
            courseName: "course 2",
            courseId: "2"
        },
        {
            courseName: "course 3",
            courseId: "3"
        },
    ];
    return(
        <Table columns={columns} data={data}/>
    );
}

export default TableListClassTeacher;