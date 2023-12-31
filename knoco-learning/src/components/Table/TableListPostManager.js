
import React from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { async } from "q";
import { BsFillPencilFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { BsCheck2Circle } from "react-icons/bs";
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

const TableListPostManager = () => {
  const [data, setData] = useState([]);
  const [checkActive, setCheckActive] = useState();
  useEffect(() => {
    
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Post/GetAllPostALL`);
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
          src={`${API_BASE_URL}/Photos/${value}`} // Assuming 'value' is the image filename or path
          alt="Course Image"
          style={{ width: '100px', height: '100px' }} // Adjust the size as needed
        />
      ),
    },
    {
      Header: 'Status',
      accessor: 'isActive',
      Filter: ColumnFilter, // Custom filter component for courseId column
      disableFilters: true, // Vô hiệu hóa bộ lọc cho cột Button
      // disableSortBy: true,
      Cell: ({ row }) => (
        <CustomButton isActive={row.original.isActive} postId={row.original.postId} />
      ),
    },
    {
      Header: 'Chi Tiết',
      accessor: '',
      Filter: ColumnFilter, // Custom filter component for courseId column
      disableFilters: true, // Vô hiệu hóa bộ lọc cho cột Button
      // disableSortBy: true,
      Cell: ({ row }) => (
        <a href={`/manager/viewpostdetailmanager/${row.original.postId}`}>
          <BsFillPencilFill size={30} />
        </a>

      ),
    },
  ];

  // Custom Button Component
  const CustomButton = ({ isActive, postId }) => (
    <div>
      <span></span>
      {isActive === "True" ? (
        <button>Approved</button>
      ) : (
        <button onClick={() => UpdateActivePost(postId)}>Approve</button>
      )}
    </div>
  );
  const [pId, setpId] = useState('');
  const [createBy, setCreateBy] = useState('');
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [contentPost, setcontentPost] = useState('');
  const [likeAmout, setlikeAmout] = useState('');
  const [image, setimage] = useState('');
  const [createDate, setcreateDate] = useState('');

  const UpdateActivePost = async (postId) => {
    try {

      const commentResponse = await fetch(`${API_BASE_URL}/api/Post/GetPostById?Id=${postId}`);
      const data = await commentResponse.json();

      const hidePost = {
        postId: postId,
        createBy: Number(data.createBy),
        title: data.title,
        description: data.description,
        contentPost: data.contentPost,
        likeAmout: Number(data.likeAmout),
        image: data.image,
        createDate: data.createDate,
        isActive: true
      }

      fetch(`${API_BASE_URL}/api/Post/UpdatePostActive`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hidePost),
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Update post successful!")
            fetchData();
          }
          else if (!response.ok) {
            toast.error("Update post failed. Try Again!")
            throw new Error('Failed to update');
          }

        })
    } catch (error) {
      console.error('Error updating comment:', error);
      // Xử lý khi gặp lỗi (ví dụ: hiển thị toast lỗi)

    }

  }


  const handleRowClick = (row) => {
    console.log('Clicked row data:', row);
    const postId = row.postId
    // navigate(`/viewpostdetailmanager/${postId}`);
  };
  return (
    <div>
      <Table columns={columns} data={data} onRowClick={handleRowClick} />
    </div>
  )
}

export default TableListPostManager;