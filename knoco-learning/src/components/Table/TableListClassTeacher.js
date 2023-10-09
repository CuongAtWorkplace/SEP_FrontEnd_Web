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
          Header: 'Class Name',
          accessor: 'className',
          Filter: ColumnFilter, // Custom filter component for courseName column
        },
        {
          Header: 'Class ID',
          accessor: 'classId',
          Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
          Header: 'Class Subject',
          accessor: 'classSubject',
          Filter: ColumnFilter, // Custom filter component for courseId column
        },
      ];

    const data = [
        {
            className: "class 1",
            classId: "1",
            classSubject: "Math"
        },
        {
          className: "class 2",
          classId: "2",
          classSubject: "Math"
        },
        {
          className: "class 3",
          classId: "3",
          classSubject: "Physics"
        },
    ];
    return(
        <Table columns={columns} data={data}/>
    );
}

export default TableListClassTeacher;