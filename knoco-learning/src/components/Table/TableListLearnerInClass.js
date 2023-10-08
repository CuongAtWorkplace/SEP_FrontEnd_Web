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

const TableListLearnerInClass = () => {

    const columns = [
        {
          Header: 'Learner Name',
          accessor: 'learnerName',
          Filter: ColumnFilter, // Custom filter component for courseName column
        },
        {
          Header: 'Learner ID',
          accessor: 'learnerId',
          Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
          Header: 'Learner DOB',
          accessor: 'learnerDob',
          Filter: ColumnFilter, // Custom filter component for courseId column
        },
      ];

    const data = [
        {
            learnerName: "Le Quang Huy",
            learnerId :"1",
            learnerDob: "18/05/2001"
        },
        {
            learnerName: "Tran Minh Duc",
            learnerId :"2",
            learnerDob: "01/01/2001"
        },
        {
            learnerName: "Nguyen Xuan Ly",
            learnerId :"3",
            learnerDob: "12/12/2001"
        },
    ];
    return(
        <Table columns={columns} data={data}/>
    );
}

export default TableListLearnerInClass;