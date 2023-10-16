import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const TableListClassTeacher = (props) => {
  const { userId } = props;
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7169/api/Class/GetTeacherClassList/${2}`); // Thay thế URL bằng API thực tế
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };
  const handleRowClick = (row) => {
    // Handle the row click event here
    console.log('Clicked row data:', row);
    // Implement your logic here, e.g., navigate to a new page with the userId parameter
    navigate(`/classdetail?id=${row.userId}`); // Navigate to the new page with the userId parameter in the URL
  };
  const columns = [
    {
      Header: 'Class Name',
      accessor: 'className',
      Filter: ColumnFilter, // Custom filter component for courseName column
    },
    {
      Header: 'Teacher Name',
      accessor: 'teacherName',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'CourseName',
      accessor: 'courseName',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'NumberStudent',
      accessor: 'numberStudent',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Topic',
      accessor: 'topic',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'QuizzeName',
      accessor: 'quizzeName',
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
    },
    {
      Header: 'StartDate',
      accessor: 'startDate',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'EndDate',
      accessor: 'endDate',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Status',
      accessor: 'status',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
  ];
  const datafake = [
    {
      className: "alksdasdf",
      teacherName: "kljflkjgflk",
      courseName: "kjkjkcxnvm",
      numberStudent: "m,ncv,xmvn,mxc",
      topic: "oiwuroiwer",
      quizzName: "lkasjdlkasjdf",
      schedule: "xcaasdfasd",
      fee: "owiuurwer",
      numberOfWeek: "popoaipaf",
      createDate: "qwerqwerl",
      startDate: "asfalkdsfj",
      endDate: "aksdn,masd",
      status: "laksdjlkasdf"
    },
    {
      className: "alksdasdf",
      teacherName: "kljflkjgflk",
      courseName: "kjkjkcxnvm",
      numberStudent: "m,ncv,xmvn,mxc",
      topic: "oiwuroiwer",
      quizzName: "lkasjdlkasjdf",
      schedule: "xcaasdfasd",
      fee: "owiuurwer",
      numberOfWeek: "popoaipaf",
      createDate: "qwerqwerl",
      startDate: "asfalkdsfj",
      endDate: "aksdn,masd",
      status: "laksdjlkasdf"
    },
  ];
  return (
    <Table columns={columns} data={datafake} onRowClick={handleRowClick}/>
  );
}

export default TableListClassTeacher;