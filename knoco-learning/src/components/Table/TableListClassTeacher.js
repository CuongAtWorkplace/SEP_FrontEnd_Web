import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import '../../style/Teacher/Tag.css';
import CardAddClass from "../add/CardAddClass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
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

const TableListClassTeacher = () => {
  const [UserID,setUserID] = useState(1);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isAddClassPopupVisible, setAddClassPopupVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
		console.log(token);
		if (token !== null) {
			const decodedToken = jwtDecode(token);
			setUserID(parseInt(decodedToken.userid, 10));

		} else {
			window.location.href = "/";
		}
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7169/api/Class/GetClassListForRole/${UserID}`);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const handleRowClick = (row) => {
    console.log('Clicked row data:', row);
    navigate(`/classdetail/${row.classId}`);
  };

  const openAddClassPopup = () => {
    setAddClassPopupVisible(true);
  }

  const closeAddClassPopup = () => {
    setAddClassPopupVisible(false);
  }

  function formatAPIDate(apiDate) {
    return new Date(apiDate).toLocaleDateString('en-US');
  }

  const [columns, setColumns] = useState([
    {
      Header: 'Class name',
      accessor: 'className',
      Filter: ColumnFilter, // Custom filter component for courseName column
    },
    {
      Header: 'Teacher name',
      accessor: 'teacherName',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Course name',
      accessor: 'courseName',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Number student',
      accessor: 'numberStudent',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Topic',
      accessor: 'topic',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Schedule',
      accessor: 'schedule',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Fee',
      accessor: 'fee',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Number of week',
      accessor: 'numberOfWeek',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Create date',
      accessor: 'createDate',
      Filter: ColumnFilter, // Custom filter component for courseId column
      Cell: ({ row }) => (
        <div>
         {formatAPIDate(row.original.createDate)}
        </div>
      ),
    },
    {
      Header: 'Start date',
      accessor: 'startDate',
      Filter: ColumnFilter, // Custom filter component for courseId column
      Cell: ({ row }) => (
        <div>
         {formatAPIDate(row.original.startDate)}
        </div>
      ),
    },
    {
      Header: 'End date',
      accessor: 'endDate',
      Filter: ColumnFilter, // Custom filter component for courseId column
      Cell: ({ row }) => (
        <div>
         {formatAPIDate(row.original.endDate)}
        </div>
      ),
    },
    // {
    //   Header: 'Status',
    //   accessor: 'status',
    //   Filter: ColumnFilter, // Custom filter component for courseId column
    // },

  ]);

  return (
    <div>
      {/* <button className="btn-add" onClick={openAddClassPopup}><FontAwesomeIcon icon={faSquarePlus} /> New class</button> */}
      <Table columns={columns} data={data} onRowClick={handleRowClick} />
      {/* {
        isAddClassPopupVisible && (
          <div className="popup">
            <CardAddClass closePopup={closeAddClassPopup} />
          </div>
        )
      } */}
    </div>
  );
}

export default TableListClassTeacher;