
import React from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

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

const TableListPostManager = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7169/api/Post/GetPostListActive`);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };


  const navigate = useNavigate();
  const columns = [
    {
      Header: 'Post Id',
      accessor: 'postId',
      Filter: ColumnFilter, // Custom filter component for courseName column
    },
    {
      Header: 'Topic',
      accessor: 'title',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Question',
      accessor: 'description',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'ContentPost',
      accessor: 'contentPost',
      Filter: ColumnFilter, // Custom filter component for courseId column
    },
    {
      Header: 'Image',
      accessor: 'image',
      Filter: ColumnFilter, // Custom filter component for courseId column
      Cell: ({ value }) => (
        <img
          src={`https://localhost:7169/Photos/${value}`} // Assuming 'value' is the image filename or path
          alt="Course Image"
          style={{ width: '50px', height: '50px' }} // Adjust the size as needed
        />
      ),
    },
    {
      Header: 'Button',
      accessor: '',
      Filter: ColumnFilter, // Custom filter component for courseId column
      Cell: ({ value }) => (
        <div>
          
            <span>{value}</span>
            <button disabled={true} >Button 1</button>
            {/* <button onClick={() => handleButtonClick(value)}>Button 2</button> */}
        </div>
    
    ),
    },
  ];
  const handleButtonClick = (value) => {
    navigate(`/viewpostdetailmanager`);
};
  // const datafake = [
  //     {
  //         quizzId: "jsaajs",
  //         quizzName: "alksdjlk",
  //         question: "laksjdlksf"
  //     },
  // ]
  const handleRowClick = (row) => {
    console.log('Clicked row data:', row);
    const postId = row.postId
    navigate(`/viewpostdetailmanager/${postId}`);
  };
  return (
    <div>
      <Table columns={columns} data={data} onRowClick={handleRowClick} />
    </div>
  )
}

export default TableListPostManager;