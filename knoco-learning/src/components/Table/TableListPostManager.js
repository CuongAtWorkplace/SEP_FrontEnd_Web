
import React from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { async } from "q";

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
      const response = await fetch(`https://localhost:7169/api/Post/GetAllPostALL`);
      const responseData = await response.json();
      setData(responseData);

    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };


  const navigate = useNavigate();
  // const columns = [
  //   {
  //     Header: 'Post Id',
  //     accessor: 'postId',
  //     Filter: ColumnFilter, // Custom filter component for courseName column
  //   },
  //   {
  //     Header: 'Topic',
  //     accessor: 'title',
  //     Filter: ColumnFilter, // Custom filter component for courseId column
  //   },
  //   {
  //     Header: 'Question',
  //     accessor: 'description',
  //     Filter: ColumnFilter, // Custom filter component for courseId column
  //   },
  //   {
  //     Header: 'ContentPost',
  //     accessor: 'contentPost',
  //     Filter: ColumnFilter, // Custom filter component for courseId column
  //   },
  //   {
  //     Header: 'isActive',
  //     accessor: 'isActive',
  //     Filter: ColumnFilter, // Custom filter component for courseId column
  //   },

  //   {
  //     Header: 'Image',
  //     accessor: 'image',
  //     Filter: ColumnFilter, // Custom filter component for courseId column
  //     Cell: ({ value }) => (
  //       <img
  //         src={`https://localhost:7169/Photos/${value}`} // Assuming 'value' is the image filename or path
  //         alt="Course Image"
  //         style={{ width: '50px', height: '50px' }} // Adjust the size as needed
  //       />
  //     ),
  //   },
  //   {
  //     Header: 'Button',
  //     accessor: '',
  //     Filter: ColumnFilter, // Custom filter component for courseId column
  //     Cell: ({ row }) => (
  //       <div>
  //       <span></span>

  //       {row.isActive === "True" ? (
  //         <button >Button 2</button>
  //       ) : (
  //         <button >Button 1</button>
  //       )}
  //     </div>

  //   ),
  //   },
  // ];
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
    // {
    //   Header: 'isActive',
    //   accessor: 'isActive',
    //   Filter: ColumnFilter, // Custom filter component for courseId column
    // },
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
      Cell: ({ row }) => (
        <CustomButton isActive={row.original.isActive} postId={row.original.postId} onClickHandler={UpdateHidePost} />
      ),
    },
  ];

  // Custom Button Component
  const CustomButton = ({ isActive, postId, onClickHandler }) => (
    <div>
      <span></span>
      {isActive === "True" ? (
        <button>Button 2</button>
      ) : (
        <button onClick={() => onClickHandler(postId)}>Duyệt</button>
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

  const UpdateHidePost = async (postId) => {
    alert(postId);
    try {

      const commentResponse = await fetch(`https://localhost:7169/api/Post/GetPostById?Id=${postId}`);
      const data = await commentResponse.json();

      setCreateBy(data.createBy);
      settitle(data.title);
      setdescription(data.description);
      setcontentPost(data.contentPost);
      setcreateDate(data.createDate);
      setlikeAmout(data.likeAmout);
      setimage(data.image);

      const hidePost = {
        postId: postId,
        createBy: Number(createBy),
        title: title,
        description: description,
        contentPost: contentPost,
        likeAmout: Number(likeAmout),
        image: image,
        createDate: createDate,
        isActive: true
      }

      fetch('https://localhost:7169/api/Post/UpdatePostActive', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hidePost),
      })
        .then((response) => {
          if (response.ok) {

          }
          else if (!response.ok) {
            throw new Error('Failed to update');
          }

        })
    } catch (error) {
      console.error('Error updating comment:', error);
      // Xử lý khi gặp lỗi (ví dụ: hiển thị toast lỗi)

    }

  }
  const handleButtonClick = (value) => {
    navigate(`/viewpostdetailmanager`);
  };

  const handleRowClick = (row) => {
    console.log('Clicked row data:', row);
    const postId = row.postId
    navigate(`/viewpostdetailmanager/${postId}`);
  };
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  )
}

export default TableListPostManager;