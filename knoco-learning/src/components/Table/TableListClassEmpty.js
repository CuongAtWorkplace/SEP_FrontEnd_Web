import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
import { API_BASE_URL } from "../../paths";
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

const TableListClassEmpty = (props) => {
  const [data, setData] = useState([]);
  //const [allClass, setallClass] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Class/GetListEmptyClass/${params.courseId}`);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  function formatAPIDate(apiDate) {
    return new Date(apiDate).toLocaleDateString('en-US');
  }

  const handleRowClick = async (row) => {
    console.log('Clicked row data:', row);
  };

  const AddRequestClass = async (classId) => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decodedToken = jwtDecode(token);
  
      const addRequest = {
        classId: classId,
        userId: parseInt(decodedToken.userid, 10),
        type: null
      };
  
      try {
        const response = await fetch(`${API_BASE_URL}/api/Class/CreateRequestClassManager`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addRequest),
        });
  
        if (response.ok) {
          const confirmResult = window.confirm("Are you sure you want to teach this class?");
          if (confirmResult) {
            navigate(`/list-all-course`);
            toast.success("Sent request! Please wait for approval.");
          } else {
            window.close();
            toast.error("Do not submit request!");
          }
        } else {
          toast.error("Sent request failed. Try Again!");
          throw new Error('Failed to update');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error("Sent request failed. Try Again!");
      }
    }
  };

  const [columns, setColumns] = useState([
    {
      Header: 'Class Name',
      accessor: 'className',
      Filter: ColumnFilter, // Custom filter component for courseName column
    },
    {
      Header: 'CourseName',
      accessor: 'courseName',
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
      Header: 'NumberOfWeek',
      accessor: 'numberOfWeek',
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
      Header: 'Action',
      accessor: '',
      Filter: ColumnFilter, // Custom filter component for courseId column
      disableFilters: true, // Vô hiệu hóa bộ lọc cho cột Button
      // disableSortBy: true,
      Cell: ({ row }) => (
        <button className="btn-table" onClick={() => AddRequestClass(row.original.classId)}>
          <FontAwesomeIcon icon={faCheck} /> Choose class
        </button>
      ),
    },
  ]);

  return (
    <Table columns={columns} data={data} onRowClick={handleRowClick} />
  );
}

export default TableListClassEmpty;