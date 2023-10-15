import React, { useState, useEffect } from "react";
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

const TableListLearnerInClass = (props) => {
  const { userId } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7169/api/User/GetAllStudentInClass/${1}`); // Thay thế URL bằng API thực tế
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };
  const handleRowClick = (row) => {
    // Handle the row click event here, for example, navigate to a new page or open a modal
    console.log('Clicked row data:', row);
    // Implement your logic here, e.g., redirect to a new page
  };
  const columns = [
    {
      Header: 'Full Name',
      accessor: 'fullName',
      Filter: ColumnFilter, // Custom filter component for courseName column
    },
    {
      Header: 'Email',
      accessor: 'email',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Image',
      accessor: 'image',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Address',
      accessor: 'address',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
  ];

  return (
    <Table columns={columns} data={data} onRowClick={handleRowClick}/>
  );
}

export default TableListLearnerInClass;