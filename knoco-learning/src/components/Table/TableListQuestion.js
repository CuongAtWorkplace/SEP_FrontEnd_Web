import React from "react";
import Table from "./Table";
import './style.css'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

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

const TableListQuestion = (props) => {
    const navigate = useNavigate();
    const handleEdit = (rowData) => {
      // Logic to handle edit action for the rowData
      console.log('Edit clicked for row data:', rowData);
      // You can navigate to the edit page or show a modal for editing.
    };
    
    const handleDelete = (rowData) => {
      // Logic to handle delete action for the rowData
      console.log('Delete clicked for row data:', rowData);
      // You can show a confirmation modal and perform deletion if confirmed.
    };
    const columns = [
        {
          Header: 'Question',
          accessor: 'quizzId',
          Filter: ColumnFilter, // Custom filter component for courseName column
        },
        {
          Header: 'Option 1',
          accessor: 'quizzName',
          Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
            Header: 'Answer',
            accessor: 'question',
            Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
          Header: 'Edit',
          accessor: 'edit',
          Cell: (row) => (
            <button className="btnEditQuestion" onClick={() => handleEdit(row.original)}>
              <FontAwesomeIcon className="btnIcon" icon={faFilePen}/> Edit
            </button>
          ),
          Filter: ColumnFilter, // Custom filter component for courseId column
        },
        {
          Header: 'Delete',
          accessor: 'delete',
          Cell: (row) => (
            <button className="btnDeleteQuestion" onClick={() => handleDelete(row.original)}>
              <FontAwesomeIcon className="btnIcon" icon={faTrash}/> Delete
            </button>
          ),
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
        navigate(`/learnerdetail`);
      };
    return(
        <div>
          <h3 className="quizzName">Quizz Name</h3>
          <button className="btnCreate">
            <FontAwesomeIcon icon={faPlus}/> Add Question
          </button>
          <Table columns={columns} data={datafake} onRowClick={handleRowClick}/>
        </div>
    )
}

export default TableListQuestion;