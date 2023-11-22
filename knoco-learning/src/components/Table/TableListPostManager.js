import React from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

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

const TableListPostManager = (props) => {
    const navigate = useNavigate();
    const columns = [
        {
          Header: 'Post Id',
          accessor: 'quizzId',
          Filter: ColumnFilter, // Custom filter component for courseName column
        },
        {
          Header: 'Topic',
          accessor: 'quizzName',
          Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Question',
            accessor: 'question',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
    ];
    const datafake = [
        {
            quizzId: "jsaajs",
            quizzName: "alksdjlk",
            question: "laksjdlksf"
        },
    ]
    const handleRowClick = (row) => {
        console.log('Clicked row data:', row);
        navigate(`/viewpostdetailmanager`);
      };
    return(
        <div>
            <Table columns={columns} data={datafake} onRowClick={handleRowClick}/>
        </div>
    )
}

export default TableListPostManager;